define({ 
        
    init: function() {
        this.view.flxNextMonth.isVisible = false;
        this.view.lblCurrentBalanceValue.text = serviceCategoryRefactored.getCurrentBalance() + userServiceRefactored.getById(CURRENT_USER.id).currency;
      	this.outcomeClick(DATE.month, DATE.year);
        this.view.lblDate.text = getMonth[DATE.month] + "/" + DATE.year;
    },

    incomeClick: function(month = DATE.month, year = DATE.year) {
        let selectedItem = this.view.flxTabHeaderIncome;
        this.view.flxChartContainer.removeAll();
        this.addChart(CATEGORY_TYPES.CURRENT);
        this.changeTabHeaderColor(selectedItem);
        this.changeTabSumInfo(selectedItem);
        this.setSegmentLabels(CATEGORY_TYPES.CURRENT, month, year);
    },

    outcomeClick: function(month , year) {
        let selectedItem = this.view.flxTabHeaderOutcome;
        this.view.flxChartContainer.removeAll();
        this.addChart(CATEGORY_TYPES.EXPENSE);
        this.changeTabHeaderColor(selectedItem);
        this.changeTabSumInfo(selectedItem);
       	this.setSegmentLabels(CATEGORY_TYPES.EXPENSE, month, year);
    },

    backwardClick: function() {
		navToForm("frmCategoriesList");
    },
    
    goToNextMonth: function(){
        if(DATE.month + 1 <= 11){
            DATE.month = DATE.month + 1;
        }
        else{
            DATE.month = 0;
            DATE.year = DATE.year + 1;
        }
        this.view.lblDate.text = getMonth[DATE.month] + "/" + DATE.year;
        this.outcomeClick(DATE.month, DATE.year);
        
	},
    
    goToPreviousMonth: function(){
        if(DATE.month - 1 >= 0){
            DATE.month = DATE.month - 1;
        }
        else{
            DATE.month = 11;
            DATE.year = DATE.year - 1;
        }
        this.view.lblDate.text = getMonth[DATE.month] + "/" + DATE.year;
        this.outcomeClick(DATE.month, DATE.year);
        this.view.flxNextMonth.isVisible = true;
	},

    changeTabHeaderColor: function(selectedItem) {
        if (selectedItem === this.view.flxTabHeaderIncome){
            this.view.lblTabHeaderOutcome.skin = "sknTabHeaderInactive";
            this.view.lblTabHeaderIncome.skin = "sknTabHeaderActive";
        }else {
            this.view.lblTabHeaderOutcome.skin = "sknTabHeaderActive";
            this.view.lblTabHeaderIncome.skin = "sknTabHeaderInactive";
        }

    },

    changeTabSumInfo: function(selectedItem) {
        if (selectedItem === this.view.flxTabHeaderIncome) {
            this.view.lblTabSumInfo.text = "Income";
            this.view.lblTabSumInfoValue.text = 
                this.getBalanceForEachMonthByType(CATEGORY_TYPES.CURRENT, new Date().getFullYear(), new Date().getMonth()) + userServiceRefactored.getById(CURRENT_USER.id).currency;
        } else {
            this.view.lblTabSumInfo.text = "Outcome";
            this.view.lblTabSumInfoValue.text = 
                this.getBalanceForEachMonthByType(CATEGORY_TYPES.EXPENSE, new Date().getFullYear(), new Date().getMonth()) + userServiceRefactored.getById(CURRENT_USER.id).currency;
        }
    },
    
	getTransactionsInDefaultCurrency: function(){
        let currencyDefault = userServiceRefactored.getById(CURRENT_USER.id).currency;
        let trans = serviceTransactionsRefactored.getAll();
        let categories =  serviceCategoryRefactored.getCategories();
        let defaultTrans = [];
		let data = {};
        let currencyTo, currencyFrom;
        for(let i = 0; i < trans.length; i++){
			data = {id: trans[i].id,
                    from: trans[i].from,
                    to: trans[i].to,
                    date: trans[i].date,
                    comment: trans[i].commentary};
			currencyTo = serviceCategoryRefactored.getCurrencyById(trans[i].to);
			currencyFrom = serviceCategoryRefactored.getCurrencyById(trans[i].from);
			if(currencyTo === currencyFrom && currencyTo === currencyDefault){
				data.amount = trans[i].fromAmount;
			}else if(currencyFrom === currencyDefault){
                    data.amount = calculate(currencyTo, currencyDefault, trans[i].toAmount);	
			}else{
			data.amount = calculate(currencyFrom, currencyDefault, trans[i].fromAmount);		
		}
			defaultTrans.push(data);
       }
        return defaultTrans;  
    },
    
    getTransactionsByType: function (type) {
        let categories = serviceCategoryRefactored.getCategories();
        let transactions = this.getTransactionsInDefaultCurrency();
        let categoriesByType = [];
        let transactionsByType = [];
        for(let i = 0; i < categories.length; i++) {
            if(categories[i].type === type) {
                categoriesByType.push(categories[i]);
            }
        }
        for(let i = 0; i < categoriesByType.length; i++) {
            for(let j = 0; j < transactions.length; j++) {
                if(categoriesByType[i].id === transactions[j].to) {
                    transactionsByType.push(transactions[j]);
                }
            }
        }
        return transactionsByType;
    },
    
    getBalanceForEachMonthByType: function (type, year, month) {
        year = year || new Date().getFullYear();
        let transactions = this.getTransactionsByType(type);
        let transactionsForEachMonth = [];
        let sum = 0;
        for (let j = 0; j < transactions.length; j++) {
             if (transactions[j].date.getMonth() === month && transactions[j].date.getFullYear() === year) {
                sum += transactions[j].amount;
             }
        }
            transactionsForEachMonth.push(sum);
        
        return transactionsForEachMonth;
        
    },

    //this function returns ids of transactions where transactions were done this month
	getTransactionsIdByMonth: function(month, year){
    let transMonthIds = [];
    let transactions = this.getTransactionsInDefaultCurrency();
        for(let i = 0; i < transactions.length; i++){
            if(transactions[i].date.getMonth() === month && transactions[i].date.getFullYear() === year){
                transMonthIds.push(transactions[i].from);
                transMonthIds.push(transactions[i].to);
            }
        }
    let unique = (value, index, self) => {
            return self.indexOf(value) === index;
        };
        return transMonthIds.filter(unique);
	},
       
    //this function returns categories where transactions were done this month
	getCategoriesByMonth: function(month,year){
        transMonthIds = this.getTransactionsIdByMonth(month, year);
        let categoriesOfMonth = [];
        for(let i = 0; i < transMonthIds.length; i++){
            categoriesOfMonth.push(serviceCategoryRefactored.getById(transMonthIds[i]));
        }
    return categoriesOfMonth;
    },    
    
	//this function returns balance for categories where transactions were done this month
    getBalanceByMonth: function(categoryId, month, year){
        let transMonth = [];
        let transactions = this.getTransactionsInDefaultCurrency();
        for(let i = 0; i < transactions.length; i++){
            if(transactions[i].date.getMonth() === month && transactions[i].date.getFullYear() === year){
                transMonth.push(transactions[i]);
            }
        }
        let categoryBalance = 0.00;
        
        for(let i = 0; i < transMonth.length; i++){
            if(transMonth[i].to === categoryId){
                categoryBalance += parseFloat((transMonth[i].amount).toFixed(2));
                
            }
        }
        return categoryBalance;
    },//correct
    
    getListNamesAndBalanceByCategory: function(categoryType, month, year) {
        let listNameAndBalanceByCategory = [];
        let categoryList = this.getListOfCategoriesByType(categoryType, month, year);

        categoryList.forEach( i => {
            let categorySum = this.getBalanceByMonth(i.id, month, year);
            if (categorySum) {
                listNameAndBalanceByCategory.push({balance : categorySum,
                                                   name : i.name});
            }
        });
        return listNameAndBalanceByCategory;
    },

    getListOfCategoriesByType: function(categoryType, month, year) {
        let categories = this.getCategoriesByMonth(month, year);
        let expenses = [];
        let income = [];
        for(let i = 0; i < categories.length; i++){
            if(categories[i].type === "Expenses"){
                expenses.push(categories[i]);
            } else if (categories[i].type === "Current") {
                income.push(categories[i]);
            }
        }
        if (arguments[0] === "Expenses") {
            return expenses;
        } else return income;
    },//correct

    getBalanceByTypeOfCategories: function(categoryType, month, year) {
        let listOfCategories = this.getListNamesAndBalanceByCategory(categoryType, month, year).map(i => i.balance);
        return listOfCategories.reduce((accumulator, currentValue) => accumulator + currentValue); 
    },

    setSegmentLabels: function(categoryType, month, year) {
        let segment = this.view.segLabels;
        // I copied and modified the array so that I could display values and currency
        let segmentData = this.getListNamesAndBalanceByCategory(categoryType, month, year).map(i => {
            return {
                name: i.name,
                balance: i.balance + userServiceRefactored.getById(CURRENT_USER.id).currency
            };
        });

        segment.widgetDataMap = {
            lblTemplateName: "name",
            lblTemplateValue: "balance"
        };
        segment.setData(segmentData);
    },


    addChart: function(categoryType) {
        let chartWidjet = this.kdv_createChartWidget(categoryType);
        this.view.flxChartContainer.add(chartWidjet);
    },  

    kdv_createChartWidget: function(categoryType) {
        let chartObj = this.kdv_createChartJSObject(categoryType);
        let chartWidget = new kony.ui.Chart2D3D({
            "id": "chartid",
            "isVisible": true
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "containerWeight": 100
        }, chartObj);

        return chartWidget;
    },


    kdv_createChartJSObject: function(categoryType) {

        let chartInfo = {
            "chartProperties": {
                "chartHeight": 100,
                "enableScrolling": false,
                "position": [0, 0, 100, 100],
                "title": {
                    "visible": false,
                    "text": "",
                    "font": {
                        "size": [18],
                        "family": ["Helvetica"],
                        "style": ["normal"],
                        "color": ["0x000000ff"],
                        "transparency": [0]
                    },
                    "position": "top",
                    "alignment": "center",
                    "direction": "up",
                    "containerWt": 10,
                    "margin": [0, 0, 0, 0],
                    "border": {
                        "visible": false,
                        "line": {
                            "color": ["0xaaaaaaff"],
                            "width": [1],
                            "transparency": [0]
                        }
                    },
                    "background": {
                        "fillType": "gradient",
                        "transparency": 0,
                        "gradientType": "linearTopToBottom",
                        "gradientRatios": [0, 100],
                        "color": ["0xF4F5F7FF", "0xAAAEB9FF"]
                    }
                },
                "layerArea": {
                    "border": {
                        "visible": false,
                        "line": {
                            "color": ["0xaaaaaaff"],
                            "width": [1],
                            "transparency": [0]
                        }
                    },
                    "background": {
                        "fillType": "gradient",
                        "transparency": 100,
                        "gradientType": "linearTopToBottom",
                        "gradientRatios": [0, 30, 70, 100],
                        "color": ["0xecedf0FF", "0xbabec8FF", "0xadb1bcFF", "0xecedf0FF"]
                    }
                },
                "dataSetMapping": {
                    "setId": "dataset1",
                    "eventsSetId": "eventsMap1"
                },
                "drawEntities": ["donutChart"],
                "donutChart": {
                    "columnId": [0],
                    "animations": {
                        "onInitAnimation": true
                    },
                    "spinWheel": false,
                    "plotZeroValues": false,
                    "plotMissingValues": "assumeZero",
                    "direction": "clockWise",
                    "startAngle": 0,
                    "holeRadius": 0,
                    "exploded": false,
                    "pieSlice": {
                        "fillType": ["gradient"],
                        "gradientType": ["linearTopToBottom"],
                        "transparency": [0],
                        "color": [
                            ["0xff9773ff", "0xfb6530ff"],
                            ["0x60ff00ff", "0x2f7c02ff"],
                            ["0x7cfdffff", "0x305353ff"],
                            ["0xffd658ff", "0x8c701aff"],
                            ["0xba69ffff", "0x22005dff"],
                            ["0xff6c6cff", "0xb50000ff"],
                            ["0xab6effff", "0x320077ff"],
                            ["0xffd675ff", "0xb37e00ff"],
                            ["0xff6cfdff", "0x9d009bff"],
                            ["0x6253f6ff", "0x0a0538ff"]
                        ]
                    },
                    "border": {
                        "visible": true,
                        "line": {
                            "width": [1],
                            "style": ["continuous"],
                            "visible": true,
                            "color": ["0x000000ff"],
                            "transparency": [0]
                        }
                    },
                    "dataLabels": {
                        "visible": true,
                        "separator": "space",
                        "placement": "edge",
                        "indicators": ["rowName"],
                        "orientationAngle": null,
                        "connector": {
                            "visible": true,
                            "line": {
                                "width": [1],
                                "style": ["continuous"],
                                "visible": true,
                                "color": ["0x000000ff"],
                                "transparency": [0]
                            }
                        },
                        "font": {
                            "family": ["HelveticaNeue"],
                            "style": ["Bold"],
                            "size": [20],
                            "transparency": [0],
                            "color": ["0x000000ff"]
                        }
                    },
                    "margin": [0, 0, 0, 0]
                }
            },
            "chartData": {
                "rowNames": {
                    "values": this.getListNamesAndBalanceByCategory(categoryType, DATE.month, DATE.year).map(i => i.name)
                },
                "columnNames": {
                    "values": ["Amount"]
                },
                "data": {
                    "Amount": this.getListNamesAndBalanceByCategory(categoryType, DATE.month, DATE.year).map(i => i.balance)
                }
            },
            "chartEvents": {
                "events": ["eventsMap1"],
                "eventsMap1": {
                    "onPinchZoom": {
                        "minimumZoomScale": 1,
                        "maximumZoomScale": 2
                    },
                    "onTouch": {
                        "crossHair": null,
                        "dataLabels": {
                            "visible": true,
                            "indicators": ["rowName", "numberValue"],
                            "separator": "space",
                            "font": {
                                "size": [70],
                                "family": ["Verdana"],
                                "style": ["Bold"],
                                "color": ["0xffffffff"],
                                "transparency": [0]
                            }
                        },
                        "border": {
                            "visible": true,
                            "roundedCorner": false,
                            "line": {
                                "color": ["0xffffffff"],
                                "width": [2],
                                "transparency": [0]
                            }
                        },
                        "background": {
                            "fillType": "color",
                            "transparency": 30,
                            "color": ["0x000000ff"]
                        }
                    }
                }
            }
        };

        return chartInfo;
    },

 });