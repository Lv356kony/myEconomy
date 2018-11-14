define({ 

    initIncomeCategoriesList: function(){
        let categories = [];
        for (let i = 0; i < DATA.categories.length; i++) {
            if(DATA.categories[i].type === "Income"){
                categories.push({
                    name: DATA.categories[i].name,
                    icon: DATA.categories[i].icon,
                    id:  DATA.categories[i].id 
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
                    icon: DATA.categories[i].icon,
                    id:  DATA.categories[i].id 
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
                    icon: DATA.categories[i].icon,
                    id:  DATA.categories[i].id 

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



    goToHistory: function(seguiWidget){ 

        let currentCategory = this.view[seguiWidget.id].selectedRowItems;
        navToForm("frmHistory", {categoryId : currentCategory[0].id} );
		
    }


});