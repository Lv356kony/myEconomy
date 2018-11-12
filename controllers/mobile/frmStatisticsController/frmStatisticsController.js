define({ 

  init: function () {
    this.addChart("Expenses");
    this.view.lblCurrentBalanceValue.text = serviceTransactions.getBalanceByUserId(CURRENT_USER.id) + " UAH";
    let segment = this.view.segLabels;
    segment.widgetDataMap = {
      lblTemplateName: "name",
      lblTemplateValue: "balance"
    };
    segment.setData(this.getListNamesAndBalanceByCategory("Expenses"));
  },


  incomeClick : function() {
    this.view.flxChartContainer.removeAll();
    this.addChart("Current");
    const selectedItem = this.view.flxTabHeaderIncome;
    this.changeTabHeaderColor(selectedItem);
    this.changeTabSumInfo(selectedItem);
    let segment = this.view.segLabels;
    segment.widgetDataMap = {
      lblTemplateName: "name",
      lblTemplateValue: "balance"
    };
    segment.setData(this.getListNamesAndBalanceByCategory("Current"));
  },


  outcomeClick : function() {
    this.view.flxChartContainer.removeAll();
    this.addChart("Expenses");
    const selectedItem = this.view.flxTabHeaderOutcome;
    this.changeTabHeaderColor(selectedItem);
    this.changeTabSumInfo(selectedItem);
    let segment = this.view.segLabels;
    segment.widgetDataMap = {
      lblTemplateName: "name",
      lblTemplateValue: "balance"
    };
    segment.setData(this.getListNamesAndBalanceByCategory("Expenses"));
  },


  changeTabHeaderColor : function(selectedItem) {
    if (selectedItem === this.view.flxTabHeaderIncome){
      this.view.lblTabHeaderOutcome.skin = "sknTabHeaderInactive";
      this.view.lblTabHeaderIncome.skin = "sknTabHeaderActive";
    }else {
      this.view.lblTabHeaderOutcome.skin = "sknTabHeaderActive";
      this.view.lblTabHeaderIncome.skin = "sknTabHeaderInactive";
    }

  },


  changeTabSumInfo : function(selectedItem) {
    if (selectedItem === this.view.flxTabHeaderIncome) {
      this.view.lblTabSumInfo.text = "Income";
      this.view.lblTabSumInfoValue.text = "2345 UAH";
    } else {
      this.view.lblTabSumInfo.text = "Outcome";
      this.view.lblTabSumInfoValue.text = "1258 UAH";
    }
  },


  getListNamesAndBalanceByCategory : function (categorytype) {
    let listNameAndBalanceByCategiry = [];
    let categoryList = this.getListOfCategoriesByType(categorytype);

    categoryList.forEach( i => {
      let categorySum = serviceTransactions.getBalanceByCategoryId(i.id);
      if (categorySum) {
        listNameAndBalanceByCategiry.push({balance : categorySum,
                                           name : i.name});
      }
    });
    return listNameAndBalanceByCategiry;
  },


  getListOfCategoriesByType: function (categorytype) {
    let userId = CURRENT_USER.id;
    let expenses = [];
    let income = [];
    for(let i = 0; i < DATA.categories.length; i++){
      if(userId === DATA.categories[i].user_id && DATA.categories[i].type === "Expenses"){
        expenses.push(DATA.categories[i]);
      } else if (userId === DATA.categories[i].user_id && DATA.categories[i].type === "Current") {
        income.push(DATA.categories[i]);
      }
    }
    if (arguments[0] === "Expenses") {
      return expenses;
    } else return income;

  },


  addChart: function (categorytype) {
    var chartWidjet = this.kdv_createChartWidget(categorytype);
    this.view.flxChartContainer.add(chartWidjet);
  },


  kdv_createChartWidget: function(categorytype) {
    var chartObj = this.kdv_createChartJSObject(categorytype);
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


  kdv_createChartJSObject: function(categorytype) {

    var chartInfo = {
      "chartProperties": {
        "chartHeight": 100,
        "enableScrolling": false,
        "position": [0, 0, 100, 100],
        "title": {
          "visible": false,
          "text": "Olympic Medals : SpinWheel, onTouch indicators",
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
          "spinWheel": true,
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
            "placement": "outside",
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
              "size": [25],
              "transparency": [0],
              "color": ["0x000000ff"]
            }
          },
          "margin": [0, 0, 0, 0]
        }
      },
      "chartData": {
        "rowNames": {
          "values": this.getListNamesAndBalanceByCategory(categorytype).map(i => i.name)
        },
        "columnNames": {
          "values": ["Amount"]
        },
        "data": {
          "Amount": this.getListNamesAndBalanceByCategory(categorytype).map(i => i.balance)
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