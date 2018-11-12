define({ 
    initCategoryIncomeList : function(){

        let categories = serviceCategory.getCategories();
        let data = [];
        for(let i = 0; i < categories.length; i++) {
            if(categories[i].type === "Income") {
                data.push({
                    name: categories[i].name,
                    icon: categories[i].icon
                });	
            }
        }
        let segment = this.view.sgmIncome;
        segment.widgetDataMap = {
            lblIncome: 'name',
            icnIncome: 'icon',
        };
        segment.setData(data);
    },

});