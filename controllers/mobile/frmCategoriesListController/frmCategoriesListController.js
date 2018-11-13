define({ 

	initIncomeCategoriesList: function(){
     	let categories = [];
     	for (let i = 0; i < DATA.categories.length; i++) {
			if(DATA.categories[i].type === "Income"){
         		categories.push({
				name: DATA.categories[i].name,
				icon: DATA.categories[i].icon
    			});
            }
		}
        let segment = this.view.segmIncome;
		segment.widgetDataMap = {
      	lblCategories: "name",
      	icnCategories: "icon"
    	};
    	segment.setData(categories);
	},

    initCurrentCategoriesList: function(){
     	let categories = [];
     	for (let i = 0; i < DATA.categories.length; i++) {
			if(DATA.categories[i].type === "Current"){
         		categories.push({
				name: DATA.categories[i].name,
				icon: DATA.categories[i].icon
    			});
            }
		}
        let segment = this.view.segmCurrent;
		segment.widgetDataMap = {
      	lblCategories: "name",
      	icnCategories: "icon"
    	};
    	segment.setData(categories);
	},

    initExpensesCategoriesList: function(){
     	let categories = [];
     	for (let i = 0; i < DATA.categories.length; i++) {
			if(DATA.categories[i].type === "Expenses"){
         		categories.push({
				name: DATA.categories[i].name,
				icon: DATA.categories[i].icon
    			});
            }
		}
        let segment = this.view.segmExpenses;
		segment.widgetDataMap = {
      	lblCategories: "name",
      	icnCategories: "icon"
    	};
    	segment.setData(categories);
	},
    
    calculateIncomeBalance: function(){
        let incomeLabel = this.view.lblIncomeCount;
        incomeLabel.text = serviceTransactions.getIncomeBalanceByUserId();
    },
    
    calculateCurrentBalance: function(){
        let incomeLabel = this.view.lblCurrentCount;
        incomeLabel.text = serviceTransactions.getCurrentBalanceByUserId();
    },
    
    calculateExpensesBalance: function(){
        let incomeLabel = this.view.lblExpensesCount;
        incomeLabel.text = serviceTransactions.getExpensesBalanceByUserId();
    },


});