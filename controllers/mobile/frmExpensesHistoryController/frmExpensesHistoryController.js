define({ 

    init: function (year) { 
        this.addChart(year);
        this.view.grdIncome.data = [{col1: Math.min(...this.getValuesRange(CATEGORY_TYPES.CURRENT)), 
                                     col2: (Math.min(...this.getValuesRange(CATEGORY_TYPES.CURRENT)) + Math.max(...this.getValuesRange(CATEGORY_TYPES.CURRENT))) / 2, 
                                     col3:  Math.max(...this.getValuesRange(CATEGORY_TYPES.CURRENT))}];
        this.view.grdExpenses.data = [{col1: Math.min(...this.getValuesRange(CATEGORY_TYPES.EXPENSE)), 
                                       col2: (Math.min(...this.getValuesRange(CATEGORY_TYPES.EXPENSE)) + Math.max(...this.getValuesRange(CATEGORY_TYPES.EXPENSE))) / 2, 
                                       col3:  Math.max(...this.getValuesRange(CATEGORY_TYPES.EXPENSE))}];   
    },

    backwardClick: function() {
        navToForm("frmCategoriesList");
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

    getDateRange: function() {
        let datesMock = [];
        serviceTransactionsRefactored.getAll().forEach(i => {
            datesMock.push(i.date);
        });
        let startDate = new Date(Math.min(...datesMock)).toISOString();
        let endDate = new Date().toISOString();
        let start      = startDate.split('-');
        let end        = endDate.split('-');
        let startYear  = parseInt(start[0]);
        let endYear    = parseInt(end[0]);
        let dates      = [];

        for(let i = startYear; i <= endYear; i++) {
            let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
            let startMon = i === startYear ? parseInt(start[1])-1 : 0;
            for(let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
                dates.push([ getMonth[j], i].join('/'));
            }
        }
        return dates;
    },
    
	//returns data by type of all period
    getValuesRange: function(type) {
        let datesMock = [];
        serviceTransactionsRefactored.getAll().forEach(i => {
            datesMock.push(i.date);
        });
        let startDate = new Date(Math.min(...datesMock)).toISOString();
        let endDate = new Date().toISOString();
        let start      = startDate.split('-');
        let end        = endDate.split('-');
        let startYear  = parseInt(start[0]);
        let endYear    = parseInt(end[0]);
        let values     = [];

        for(let i = startYear; i <= endYear; i++) {
            let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
            let startMon = i === startYear ? parseInt(start[1])-1 : 0;

            values.push(this.getBalanceForEachMonthByType(type,i));
        }
        return [].concat.apply([], values);
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
                "chartHeight": 200,
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
                        "text": ["Expense", "Income"],
                        "color": ["0x000000ff", "0x000000ff"],
                        "margin": [3, 5, 3, 3]
                    },
                    "textValue": {
                        "text": ["$909", "$309"],
                        "color": ["0x169EECFF", "0xBE0056ff"],
                        "margin": [5, 5, 0, 0]
                    },
                    "font": {
                        "size": [40],
                        "family": ["Verdana"],
                        "style": ["normal"],
                        "color": ["0xaaaaaaff"],
                        "transparency": [0]
                    },
                    "position": "top",
                    "alignment": "center",
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
                                "size": [30],
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
                            "maxValue": parseInt(Math.max(...this.getValuesRange())+100),
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
                                "size": [30],
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
                    "values": this.getDateRange()
                },
                "columnNames": {
                    "values": ["Expenses", "Current"]
                },
                "data": {
                    "Expenses": this.getValuesRange(CATEGORY_TYPES.EXPENSE),
                    "Current": this.getValuesRange(CATEGORY_TYPES.CURRENT)
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