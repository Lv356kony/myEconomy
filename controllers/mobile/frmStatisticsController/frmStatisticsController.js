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
  
 });