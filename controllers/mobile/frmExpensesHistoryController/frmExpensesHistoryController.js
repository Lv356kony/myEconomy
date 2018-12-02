define({ 
    
	init: function (year) { 
        this.addChart(year);
       	this.view.grdIncome.data = [{col1: Math.min(...this.getBalanceForEachYearByType("Current")), 
           col2: (Math.min(...this.getBalanceForEachYearByType("Current")) + Math.max(...this.getBalanceForEachYearByType("Current"))) / 2, 
           col3:  Math.max(...this.getBalanceForEachYearByType("Current"))}];
		this.view.grdExpenses.data = [{col1: Math.min(...this.getBalanceForEachYearByType("Expenses")), 
           col2: (Math.min(...this.getBalanceForEachYearByType("Expenses")) + Math.max(...this.getBalanceForEachYearByType("Expenses"))) / 2, 
           col3:  Math.max(...this.getBalanceForEachYearByType("Expenses"))}];   
    },
    
    backwardClick: function() {
		navToForm("frmCategoriesList");
    },
    
    test: function(){
        
	},
    
    getTransactionsInDefaultCurrency: function(){
        let currencyDefault = DATA.users[CURRENT_USER.id - 1].currency;
        let trans = serviceTransactionsRefactored.getAll();
        let categories =  serviceCategoryRefactored.getCategories();
        let defaultTrans = [];
		let data ={};
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
    
    getBalanceForEachMonthByType: function (type, year,start,end) {
        year = year || new Date().getFullYear();
        let transactions = this.getTransactionsByType(type);
        let transactionsForEachMonth = [];
        for (let i = 0; i <= 11; i ++) {
            let sum = 0;
            for (let j = 0; j < transactions.length; j++) {
                if (transactions[j].date.getMonth() === i && transactions[j].date.getFullYear() === year) {
                    sum += transactions[j].amount;
                }
            }
            transactionsForEachMonth.push(sum);
        } 
        return transactionsForEachMonth;
        
    },
  
	formDate: function(startMonth = 0, endMonth = 11, year = new Date().getFullYear()){
		let monthes = [];
    	for(let i = startMonth; i <= endMonth; i++){
        	monthes.push( i+1 + "/" + year);
    	} 
	return monthes;  
	},

//this function returns list of dataset for chart and name of rows if type = "date"
    getBalanceForEachYearByType: function(type){
        let trans = this.getTransactionsInDefaultCurrency();
        let min = serviceTransactions.getById(1).date.getFullYear();
        let max = serviceTransactions.getById(1).date.getFullYear();
        trans.forEach(i => {
            if(i.date.getFullYear() > max){
                max = i.date.getFullYear();
            }if(i.date.getFullYear() < min){
                min = i.date.getFullYear();
            }
        });
        let allTrans = [];
        let dateRows = [];
        let startMonth = serviceTransactions.getById(1).date.getMonth();
        let endMonth = serviceTransactions.getById(1).date.getMonth();
        if(min === max){
            trans.forEach(i=>{
                if(i.date.getMonth() < startMonth){
                        startMonth = i.date.getMonth();
                }
                if(i.date.getMonth() > endMonth){
                        endMonth = i.date.getMonth();
                }
            });
        if(arguments[0] === "date"){
        return this.formDate(startMonth, endMonth, min);
        }else{
        return this.getBalanceForEachMonthByType(type, endYear, startMonth, endMonth);
        }
        }

        for(let year = min; year <= max; year++){
            if(min < year && year < max){
                if(arguments[0] === "date"){
                    dateRows.push(this.formDate(0, 11, year));
                }else{
                    allTrans.push(this.getBalanceForEachMonthByType(type, year, 0, 11));
                }
            }
            if(year === min && year+1 <= max){
                trans.forEach(i => {
                    if(i.date.getMonth() < startMonth && i.date.getFullYear() === year){
                        startMonth = i.date.getMonth();
                    }
                });
                if(arguments[0] === "date"){
                    dateRows.push(this.formDate(startMonth, 11, year));
                }else{
                    allTrans.push(this.getBalanceForEachMonthByType(type, year, startMonth, 11));
                }
            }
            if(year === max && year-1 >= min){
                trans.forEach(i => {
                    if(i.date.getMonth() > endMonth && i.date.getFullYear() === year){
                        endMonth = i.date.getMonth();
                    }
                });
                if(arguments[0] === "date"){
                    dateRows.push(this.formDate(0, endMonth, year));
                }else{
                    allTrans.push(this.getBalanceForEachMonthByType(type, year, 0, endMonth));
                }
            }
       }
        if(arguments[0] === "date"){
            return [].concat.apply([], dateRows);
        }else{
            return [].concat.apply([], allTrans);
        }
    },
    
    addChart : function (year) {
        year = year || new Date().getFullYear();
        var chartWidjet = this.kdv_createChartWidget(year);
        this.view.flxChartContainer.removeAll();
        this.view.flxChartContainer.add(chartWidjet);

    },
   
    //creating chart widget...
    kdv_createChartWidget: function (year) {
        var chartObj = this.kdv_createChartJSObject(year);

        var chartWidget = new kony.ui.Chart2D3D({
            "id": "chartid",
            "isVisible": true
        }, {
            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "containerWeight": 100
        }, chartObj);
        return chartWidget;
    },

    //creating chart object with chart properties and chart data...
    kdv_createChartJSObject: function (year) {
        var chartInfo = {
            "chartProperties": {
                "chartHeight": 100,
                "enableScrolling": true,
                "position": [0, 0, 100, 100],
                "title": {
                    "visible": false,
                    "text": "" + year,
                    "font": {
                        "size": ["20"],
                        "family": ["Verdana"],
                        "style": ["Bold"],
                        "color": ["0x000000ff"],
                        "transparency": [0]
                    },
                    "position": "top",
                    "alignment": "center",
                    "direction": "up",
                    "containerWt": 10,
                    "margin": [0, 0, 0, 0],
                    "background": {
                        "fillType": "gradient",
                        "transparency": 0,
                        "gradientType": "linearTopToBottom",
                        "gradientRatios": [0, 20, 50, 100],
                        "color": ["0xffffffff"]
                    }
                },
                "legend": {
                    "visible": true,
                    "indicators": ["marker", "textLabel"],
                    "separator": "space",
                    "marker": {
                        "type": "colorBox",
                        "color": ["0xa9e200ff", "0x22b8dbff"]
                    },
                    "rowName": {
                        "color": ["0x169EECFF", "0xBE0056ff"],
                        "margin": [5, 5, 0, 0]
                    },
                    "numberValue": {
                        "color": ["0x169EECFF", "0xBE0056ff"],
                        "margin": [5, 5, 0, 0]
                    },
                    "percentValue": {
                        "color": ["0x169EECFF", "0xBE0056ff"],
                        "margin": [5, 5, 0, 0]
                    },
                    "columnName": {
                        "color": ["0x169EECFF", "0xBE0056ff"],
                        "margin": [5, 5, 0, 0]
                    },
                    "textLabel": {
                        "text": ["Expenses", "Incomes"],
                        "color": ["0x000000ff", "0x000000ff"],
                        "margin": [3, 5, 1, 1]
                    },
                    "textValue": {
                        "text": ["$909", "$309"],
                        "color": ["0x169EECFF", "0xBE0056ff"],
                        "margin": [5, 5, 0, 0]
                    },
                    "font": {
                        "size": [20],
                        "family": ["Verdana"],
                        "style": ["normal"],
                        "color": ["0xaaaaaaff"],
                        "transparency": [0]
                    },
                    "position": "top",
                    "alignment": "left",
                    "layout": "horizantal",
                    "containerWt": 8,
                    "margin": [10, 10, 10, 10],
                    "padding": [1, 1, 1, 1],
                    "background": {
                        "fillType": "gradient",
                        "transparency": 100,
                        "gradientType": "linearTopToBottom",
                        "gradientRatios": [0, 20, 50, 100],
                        "color": ["0xff1234ff", "0xffffffff", "0x12121212", "0x23456789"]
                    }
                },
                "layerArea": {
                    "background": {
                        "fillType": "gradient",
                        "transparency": 0,
                        "gradientType": "linearTopToBottom",
                        "gradientRatios": [0, 20, 50, 100],
                        "color": ["0xffffffff"]
                    }
                },
                "dataSetMapping": {
                    "setId": "dataset1",
                    "eventsSetId": null
                },
                "axis": {
                    "type": ["xAxis", "yAxis"],
                    "xAxis": {
                        "scale": {
                            "type": "fixedGapMajorInterval",
                            "gap": 150
                        },
                        "axisLine": {
                            "crossOtherAxisAt": "value",
                            "line": {
                                "color": ["0xaaaaaaff"]
                            }
                        },
                        "labels": {
                            "orientationAngle": 50,
                            "font": {
                                "size": [20],
                                "family": ["Verdana"],
                                "style": ["normal"],
                                "color": ["0x000000ff"],
                                "transparency": [0]
                            }
                        }
                    },
                    "yAxis": {
                        "scale": {
                            "minValue": 0,
                            "maxValue": parseInt(Math.max(...this.getBalanceForEachYearByType())+100),
                            "majorInterval": 0,
                            "minorInterval": 0,
                            "offset": {
                                "value": [0, 0],
                                "type": "pixels"
                            }
                        },
                        "axisLine": {
                            "line": {
                                "color": ["0xaaaaaaff"]
                            }
                        },
                        "labels": {
                            "margin": [30, 0, 0, 0],
                            "font": {
                                "size": [20],
                                "family": ["Verdana"],
                                "style": ["normal"],
                                "color": ["0x000000ff"],
                                "transparency": [0]
                            }
                        },
                        "intervalMarks": {
                            "major": {
                                "line": {
                                    "color": ["0xaaaaaaff"]
                                }
                            },
                            "minor": {
                                "line": {
                                    "color": ["0xaaaaaaff"]
                                }
                            },
                            "placement": "atLabels"
                        }
                    }
                },
                "grid": {
                    "type": ["xAxisMajorGrid", "yAxisMajorGrid"],
                    "xAxisMajorGrid": {
                        "line": {
                            "color": ["0xaaaaaaff"]
                        }
                    },
                    "yAxisMajorGrid": {
                        "line": {
                            "color": ["0xaaaaaaff"]
                        }
                    }
                },
                "drawEntities": ["axis", "grid", "lineChart"],
                "lineChart": {
                    "columnId": [0, 1, 2],
                    "animations": {
                        "onInitAnimation": true
                    },
                    "graphType": "normal",
                    "lineType": "normal",
                    "dataAlignToAxis": ["primaryYAxis"],
                    "plotMissingValues": "assumeZero",
                    "line": {
                        "color": ["0x9fd500ff", "0x22b8dbff", "0xf7d700ff"],
                        "width": [3],
                        "transparency": [0]
                    },
                    "plotPoints": {
                        "visible": true,
                        "colorIndicator": "columns",
                        "marker": {
                            "type": ["bubble", "bubble", "bubble"],
                            "fillType": "color"
                        },
                        "color": ["0xa9e200ff", "0x22b8dbff", "0xf7d700ff"],
                        "transparency": [0],
                        "size": [20]
                    }
                }
            },
            "chartData": {
                "rowNames": {
                    "values": this.getBalanceForEachYearByType("date")
                },
                "columnNames": {
                    "values": ["Expenses", "Current"]
                },
                "data": {
                    "Expenses": this.getBalanceForEachYearByType(CATEGORY_TYPES.EXPENSE),
                    "Current": this.getBalanceForEachYearByType(CATEGORY_TYPES.CURRENT)
                }
            },
            "chartEvents": {
                "onSwipe": null,
                "onPinchZoom": {
                    "minimumZoomScale": 1,
                    "maximumZoomScale": 1
                },
                "onTouch": {
                    "crossHair": {
                        "line": {
                            "color": ["0xAAAAAAFF"],
                            "width": [1],
                            "transparency": [0]
                        }
                    },
                    "dataLabels": {
                        "visible": true,
                        "indicators": ["numberValue"],
                        "separator": "space",
                        "font": {
                            "size": [20],
                            "family": ["Verdana"],
                            "style": ["Bold"],
                            "color": ["0xAAAAAAFF"],
                            "transparency": [0]
                        }
                    },
                    "border": {
                        "visible": true,
                        "line": {
                            "color": ["0x9fd500ff"],
                            "width": [1],
                            "transparency": [0]
                        }
                    },
                    "background": {
                        "fillType": "color",
                        "transparency": 0,
                        "gradientType": "linearTopToBottom",
                        "gradientRatios": [],
                        "color": ["0xffffffff"]
                    }
                }
            }
        };
        return chartInfo;
    }

 });