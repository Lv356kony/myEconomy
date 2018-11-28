define({ 
     
    init: function() {
        this.view.lblCurrentBalanceValue.text = serviceTransactions.getCurrentBalanceByUserId() + " $";
        this.view.gridIncome.data = [{col1: this.getMinIncome(), 
           col2: this.getAVGIncome(), 
           col3: this.getMaxIncome("max","Income")}];
        this.view.gridExpenses.data = [{col1: this.getMinExpenses("min","Expenses"), 
           col2: this.getAVGExpenses("AVG","Expenses"), 
           col3: this.getMaxExpenses("max","Expenses")}];
        //alert(this.getListBalanceByCategory("Expenses"));
		//alert(this.getListBalanceByCategory("Income"));
        
    },
    
     backwardClick: function() {
		navToForm("frmCategoriesList");
    },
    
    //return an array of id of Currents
    getCurrentCategoryId: function() {
    let categories = serviceCategory.getCategories();
    let current = [];
    categories.forEach(i => {
        if (i.type === "Current") {
            current.push(i.id);
        }
    });
    return current;    
	},

    //get Balancy by Category Type of all period
	getBalanceByCategoryType: function(categoryType){
    let transactions = DATA.transactions;
    let current = this.getCurrentCategoryId();
    let incomesBalance = [];
    let expensesBalance = [];
    for(let i = 0; i < current.length; i++){
        for(let j = 0; j < transactions.length; j++){
            if(transactions[j].to === current[i]){
                incomesBalance.push(transactions[j].amount);
            }
            else{
                expensesBalance.push(transactions[j].amount);
            }
        }
    }
    if (arguments[0] === "Expenses") {
        return expensesBalance;
    } else return incomesBalance;
	},

    getMaxIncome: function(){
        let max = this.getBalanceByCategoryType();
        return Math.max(...max);
    },

    getMinIncome: function(){
        let min = this.getBalanceByCategoryType();
        return Math.min(...min);
    },

    getAVGIncome: function(){
        let incomes = this.getBalanceByCategoryType();
         let sum = incomes.reduce((accumulator, currentValue) => accumulator + currentValue);
         return parseFloat(Math.round((sum/incomes.length)*100))/100;
    },

    getMaxExpenses: function(){
        let max = this.getBalanceByCategoryType("Expenses");
        return Math.max(...max);
    },

    getMinExpenses: function(){
        let min = this.getBalanceByCategoryType("Expenses");
        return Math.min(...min);
    },

    getAVGExpenses: function(){
        let incomes = this.getBalanceByCategoryType("Expenses");
         let sum = incomes.reduce((accumulator, currentValue) => accumulator + currentValue);
         return parseFloat(Math.round((sum/incomes.length)*100))/100;
    },
    
   
    addChart: function(categoryType) {
        let chartWidjet = this.kdv_createChartWidget();
        this.view.flxLineChartContainer.add(chartWidjet);
    },
    

     kdv_createChartWidget: function() {
        var chartObj = this.kdv_createChartJSObject();
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
     kdv_createChartJSObject: function() {
        let data = [234, 236, 224, 244, 240, 218, 256, 254, 248, 226, 234, 228];
        var chartInfo = {
            "chartProperties": {
                "chartHeight": 100,
                "enableScrolling": true,
                "position": [0, 0, 100, 100], //[x1 y1 - top x2 y2 - bottom]
                "title": {
                    "visible": false,
                    "text": "",
                    "font": {
                        "size": ["20"],
                        "family": ["Verdana"],
                        "style": ["Bold"],
                        "color": ["0x000000ff"],
                        "transparency": [30]
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
                    "indicators": ["marker", "textLabel"],//indicators to be displayed in the legend
                    "separator": "space",
                    "marker": {
                        "type": "colorBox",
                        "color": ["0x9fd500ff", "0x22b8dbff"]
                    },
                    "rowName": {
                        "color": ["0x169EECFF", "0xBE0056ff", "0xFCC40EFF"],
                        "margin": [5, 5, 0, 0]
                    },
                    "numberValue": {
                        "color": ["0x169EECFF", "0xBE0056ff", "0xFCC40EFF"],
                        "margin": [5, 5, 0, 0]
                    },
                    "percentValue": {
                        "color": ["0x169EECFF", "0xBE0056ff", "0xFCC40EFF"],
                        "margin": [5, 5, 0, 0]
                    },
                    "columnName": {
                        "color": ["0x169EECFF", "0xBE0056ff", "0xFCC40EFF"],
                        "margin": [5, 5, 0, 0]
                    },
                    "textLabel": {
                        "text": ["Income", "Expenses"],
                        "color": ["0x9fd500ff", "0x22b8dbff"],
                        "margin": [3, 5, 1, 1]
                    },
                    "textValue": {
                        "text": ["$909", "$309", "$609"],
                        "color": ["0x169EECFF", "0xBE0056ff", "0xFCC40EFF"],
                        "margin": [5, 5, 0, 0]
                    },
                    "font": {
                        "size": [12],
                        "family": ["Verdana"],
                        "style": ["normal"],
                        "color": ["0xaaaaaaff"],
                        "transparency": [0]
                    },
                    "position": "bottom",
                    "alignment": "right",
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
                            "visible": false,
                            "crossOtherAxisAt": "value"
                        },
                        "labels": {
                            "orientationAngle": 90,
                            "font": {
                                "size": [12],
                                "family": ["Verdana"],
                                "style": ["normal"],
                                "color": ["0x000000ff"],
                                "transparency": [0]
                            }
                        }
                    },
                    "yAxis": {
                        "axisLine": {
                            "visible": false,
                            "crossOtherAxisAt": "start"
                        },
                        "labels": {
                            "margin": [30, 0, 0, 0],
                            "font": {
                                "size": [12],
                                "family": ["Verdana"],
                                "style": ["normal"],
                                "color": ["0x000000ff"],
                                "transparency": [10]
                            }
                        }
                    }
                },
                "grid": {
                    "type": ["xAxisMajorGrid"],
                    "xAxisMajorGrid": {
                        "line": {
                            "color": ["0xaaaaaaff"]
                        }
                    }
                },
                "lineChart": {
                    "columnId": [0, 1],
                    "animations": {
                        "onInitAnimation": true
                    },
                    "graphType": "normal",
                    "lineType": "normal",
                    "dataAlignToAxis": ["primaryYAxis"],
                    "plotMissingValues": "assumeZero",
                    "line": {
                        "color": ["0x9fd500ff", "0x22b8dbff"],
                        "width": [3],
                        "transparency": [0]
                    },
                    "plotPoints": {
                        "visible": false,
                        "colorIndicator": "columns",
                        "marker": {
                            "type": ["bubble", "bubble", "bubble"],
                            "fillType": "color"
                        },
                        "color": ["0xa9e200ff", "0x22b8dbff", "0xf7d700ff"],
                        "transparency": [0],
                        "size": [12]
                    },
                    "dataLabels": null
                },
                "drawEntities": ["axis", "grid", "areaChart", "lineChart"],
                "areaChart": {
                    "columnId": [3],
                    "animations": {
                        "onInitAnimation": true
                    },
                    "graphType": "normal",
                    "lineType": "normal",
                    "dataAlignToAxis": ["primaryYAxis"],
                    "plotMissingValues": "assumeZero",
                    "area": {
                        "fillType": ["color"],
                        "transparency": [20],
                        "color": ["0x00ff00ff"],
                        "colorAboveXAxis": ["0xB4B4B4FF"],
                        "colorBelowXAxis": ["0xff0000ff"],
                        "visible": true
                    },
                    "line": {
                        "visible": false,
                        "color": ["0xff0000ff"],
                        "width": [1],
                        "transparency": [0]
                    },
                    "plotPoints": {
                        "visible": false
                    }
                }
            },
            "chartData": {
                "rowNames": {
                    "values": ["01/2018", "02/2018", "03/2018", "04/2018", "05/2018", "06/2018", "07/2018", "08/2018", "09/2018", "10/2018", "11/2018", "12/2018"]
                },
                "columnNames": {
                    "values": ["Income", "Expenses"]
                },
                "data": {
                    "Income": data,
                    "Expenses": [524, 512, 514, 526, 534, 536, 522, 544, 342, 318, 328, 324],
                    "Target": [220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220]
                }
            },
            "chartEvents": {
                "onPinchZoom": {
                    "minimumZoomScale": 1,
                    "maximumZoomScale": 2
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
                            "size": [14],
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