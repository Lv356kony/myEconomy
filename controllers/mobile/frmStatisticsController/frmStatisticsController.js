define({ 

  incomeClick : function() {
    const selectedItem = this.view.flxTabHeaderIncome;
    this.changeTabHeaderColor(selectedItem);
    this.changeTabSumInfo(selectedItem);
  },

  outcomeClick : function() {
    const selectedItem = this.view.flxTabHeaderOutcome;
    this.changeTabHeaderColor(selectedItem);
    this.changeTabSumInfo(selectedItem);
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

  kdv_createChartJSObject: function() {
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
          "holeRadius": 25,
          "exploded": false,
          "pieSlice": {
            "fillType": ["gradient"],
            "gradientType": ["linearTopToBottom"],
            "transparency": [0],
            "color": [
              ["0xf91818ff", "0x980a0aff"],
              ["0xf31515ff", "0x500b0bff"],
              ["0xcd3539ff", "0x470305ff"],
              ["0xe53340ff", "0x6d030bff"],
              ["0xf415f1ff", "0x460745ff"],
              ["0xf415f1ff", "0x460745ff"],
              ["0xf415f1ff", "0x460745ff"],
              ["0x6253f6ff", "0x0a0538ff"],
              ["0x6253f6ff", "0x0a0538ff"],
              ["0x6253f6ff", "0x0a0538ff"]
            ]
          },
          "border": {
            "visible": true,
            "line": {
              "width": [1],
              "style": ["continuous"],
              "visible": true,
              "color": ["0xffffffff"],
              "transparency": [0]
            }
          },
          "dataLabels": {
            "visible": true,
            "separator": "space",
            "placement": "inside",
            "indicators": ["rowName"],
            "orientationAngle": 0,
            "connector": {
              "visible": true,
              "line": {
                "width": [1],
                "style": ["continuous"],
                "visible": true,
                "color": ["aaaaaaff"],
                "transparency": [0]
              }
            },
            "font": {
              "family": ["HelveticaNeue"],
              "style": ["Bold"],
              "size": [40],
              "transparency": [0],
              "color": ["0xffffffff"]
            }
          },
          "margin": [0, 0, 0, 0]
        }
      },
      "chartData": {
        "rowNames": {
          "values": ["China", "USA", "Russia", "Britian", "Germany", "Australia", "Korea", "Japan", "Italy", "Ukraine"]
        },
        "columnNames": {
          "values": ["Amount1", "Amount2"]
        },
        "data": {
          "Amount1": [70, 70, 50, 30, 20, 23, 18, 15, 18, 20],
          "Amount2": [70, 70, 50, 30, 20, 23, 18, 15, 18, 20]
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


  addChart : function () {
    var chartWidjet = this.kdv_createChartWidget();

    this.view.flxChartContainer.add(chartWidjet);
  }

});