define({ 


    //TODO use varible for serviceCategory.getCategories()
    initIncomeCategoriesList: function(){
        let categories = [];
        for (let i = 0; i < serviceCategory.getCategories().length; i++) {
            let symbol = this.getCarenncySymbolForCategory(serviceCategory.getCategories()[i].id);
            if(serviceCategory.getCategories()[i].type === "Income" && serviceCategory.getCategories()[i].visible){
                categories.push({
                    name: serviceCategory.getCategories()[i].name,
                    icon: serviceCategory.getCategories()[i].icon,
                    balance: `${serviceTransactions.getIncomeBalanceByCategoryId(serviceCategory.getCategories()[i].id)} ${symbol}`,
                    id:  serviceCategory.getCategories()[i].id
                });
            }
        }
        let segment = this.view.segmIncome;
        segment.widgetDataMap = {
            lblCategories: "name",
            icnCategories: "icon",
            lblBalance: "balance"
        };
        segment.setData(categories);
    },

    //use varible for serviceCategory.getCategories()
    initCurrentCategoriesList: function(){
        let categories = [];
        for (let i = 0; i < serviceCategory.getCategories().length; i++) {
            let symbol = this.getCarenncySymbolForCategory(serviceCategory.getCategories()[i].id);
            if(serviceCategory.getCategories()[i].type === "Current" && serviceCategory.getCategories()[i].visible){
                let income = serviceTransactions.getBalanceByCategoryId(serviceCategory.getCategories()[i].id);
                let expenses = this.getExpensesFromCurrentCategory(serviceCategory.getCategories()[i].id);
                categories.push({
                    name: serviceCategory.getCategories()[i].name,
                    icon: serviceCategory.getCategories()[i].icon,
                    balance: `${income - expenses} ${symbol}`,
                    id:  serviceCategory.getCategories()[i].id
                });
            }
        }
        let segment = this.view.segmCurrent;
        segment.widgetDataMap = {
            lblCategories: "name",
            icnCategories: "icon",
            lblBalance: "balance"
        };
        segment.setData(categories);
    },

    //Recalculace using currensy service
    getExpensesFromCurrentCategory: function (categoryId) {
        let balance = 0;
        let transactions = serviceTransactions.getTransactionForCurrentUser();
        let filter = transactions.filter((element, i) => {
            if(element.from === categoryId) {
                return element;
            }
        }).map(i => i.fromAmount).forEach(i => balance += i);
        return balance;

    },

    //use varible for serviceCategory.getCategories()
    initExpensesCategoriesList: function(){
        let categories = [];
        for (let i = 0; i < serviceCategory.getCategories().length; i++) {
            let symbol = this.getCarenncySymbolForCategory(serviceCategory.getCategories()[i].id);
            if(serviceCategory.getCategories()[i].type === "Expenses" && serviceCategory.getCategories()[i].visible){
                categories.push({
                    name: serviceCategory.getCategories()[i].name,
                    icon: serviceCategory.getCategories()[i].icon,
                    balance: `${serviceTransactions.getBalanceByCategoryId(serviceCategory.getCategories()[i].id)} ${symbol}`,
                    id:  serviceCategory.getCategories()[i].id
                });
            }
        }
        let segment = this.view.segmExpenses;
        segment.widgetDataMap = {
            lblCategories: "name",
            icnCategories: "icon",
            lblBalance: "balance"
        };
        segment.setData(categories);
    },

    goToHistory: function(seguiWidget){
        let currentCategory = this.view[seguiWidget.id].selectedRowItems;
        navToForm("frmHistory", {categoryId : currentCategory[0].id} );

    },

    goToStatistics: function(){
        this.view.flxSideMenuContainer.left = '-100%';
        navToForm("frmStatistics");
    },
    goToSettings: function(){
        this.view.flxSideMenuContainer.left = '-100%';
        navToForm("frmSettings");
    },
    showMenu: function(){
        this.view.flxSideMenuContainer.left = '0%';
    },
    hideMenu: function(){
        this.view.flxSideMenuContainer.left = '-100%';
    },
    showUserInfo: function(){
        let userInfo = userService.getById(CURRENT_USER.id);
        this.view.txtUserEmail.text = userInfo.email;
    },
    logOut: function(){
        CURRENT_USER.id = undefined;
        navToForm("frmLogin");
    },
    calculateIncomeBalance: function(){
        let incomeLabel = this.view.lblIncomeCount;
        incomeLabel.text = parseFloat(Math.round(serviceCategoryRefactored.getIncomeBalance()*100))/100;
    },

    calculateCurrentBalance: function(){
        let incomeLabel = this.view.lblCurrentCount;
        incomeLabel.text = parseFloat(Math.round(serviceCategoryRefactored.getCurrentBalance()*100))/100;
    },

    calculateExpensesBalance: function(){
        let expensesLabel = this.view.lblExpensesCount;
        expensesLabel.text = parseFloat(Math.round(serviceCategoryRefactored.getExpenseBalance()*100))/100;
    },

    getCarenncySymbolForCategory: function (categoryId){
        let category = serviceCategory.getById(categoryId);
        let currency = category.currency;
        let currencySymbol;
        switch(currency) {
            case "USD":
                currencySymbol = "$";
                break;
            case "EUR":
                currencySymbol = "€";
                break;
            case "PLN":
                currencySymbol = "zł";
                break;
            default:
                currencySymbol = "₴";
        }
        return currencySymbol;
    },

    setCategoryIncomeType: function() {
        navToForm('frmCategoryCreation', {categoryType: "Income"});
    },

    setCategoryCurrentType: function() {
        navToForm('frmCategoryCreation', {categoryType: "Current"});
    },

    setCategoryExpensesType: function() {
        navToForm('frmCategoryCreation', {categoryType: "Expenses"});
    },

    goToCreationCuurentTransaction: function () {
        navToForm("frmTransactionCreation", {categoryType: "Income"});
    },

    goToCreationExpensesTransaction: function () {
        navToForm("frmTransactionCreation", {categoryType: "Expenses"});
    }
});