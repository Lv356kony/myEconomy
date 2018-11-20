define({ 

    initIncomeCategoriesList: function(){
       let categories = [];
        for (let i = 0; i < serviceCategory.getCategories().length; i++) {
            if(serviceCategory.getCategories()[i].type === "Income"){
                categories.push({
                    name: serviceCategory.getCategories()[i].name,
                    icon: serviceCategory.getCategories()[i].icon,
                    id:  serviceCategory.getCategories()[i].id

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
        for (let i = 0; i < serviceCategory.getCategories().length; i++) {
            if(serviceCategory.getCategories()[i].type === "Current"){
                categories.push({
                    name: serviceCategory.getCategories()[i].name,
                    icon: serviceCategory.getCategories()[i].icon,
                    id:  serviceCategory.getCategories()[i].id

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
        for (let i = 0; i < serviceCategory.getCategories().length; i++) {
            if(serviceCategory.getCategories()[i].type === "Expenses"){
                categories.push({
                    name: serviceCategory.getCategories()[i].name,
                    icon: serviceCategory.getCategories()[i].icon,
                    id:  serviceCategory.getCategories()[i].id

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

    },

    goToStatistics: function(){
        this.view.flxSideMenuContainer.left = '-100%';
        navToForm("frmStatistics");
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
        let data = DATA.transactions;
        let incomeIds = [];
        for(let i = 0; i < serviceCategory.getCategories().length; i++){
            if(serviceCategory.getCategories()[i].type === 'Income'){
                incomeIds.push(serviceCategory.getCategories()[i].id);
            }
        }

        let countIncome = 0.00;
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < incomeIds.length; j++){
                if(data[i].from === incomeIds[j]){
                    countIncome += data[i].amount;
                }
            }
        }
        let data = DATA.transactions;
        let incomeIds = [];
        for(let i = 0; i < serviceCategory.getCategories().length; i++){
            if(serviceCategory.getCategories()[i].type === 'Income'){
                incomeIds.push(serviceCategory.getCategories()[i].id);
            }
        }

        let countIncome = 0.00;
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < incomeIds.length; j++){
                if(data[i].from === incomeIds[j]){
                    countIncome += parseFloat(Math.round(data[i].amount*100))/100;
                }
            }
        }

        let incomeLabel = this.view.lblIncomeCount;
        incomeLabel.text = parseFloat(Math.round(countIncome*100))/100;
    },

    calculateCurrentBalance: function(){
        let incomeLabel = this.view.lblCurrentCount;
        incomeLabel.text = parseFloat(Math.round(serviceTransactions.getCurrentBalanceByUserId()*100))/100;
    },

    calculateExpensesBalance: function(){
        let data = DATA.transactions;
        let expensesIds = [];
        for(let i = 0; i < serviceCategory.getCategories().length; i++){
            if(serviceCategory.getCategories()[i].type === 'Expenses'){
                expensesIds.push(serviceCategory.getCategories()[i].id);
            }
        }

        let countExpenses = 0.00;
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < expensesIds.length; j++){
                if(data[i].to === expensesIds[j]){
                    countExpenses += parseInt(data[i].amount);
                }
            }
        }
        let expensesLabel = this.view.lblExpensesCount;
        expensesLabel.text = parseFloat(Math.round(countExpenses*100))/100;
        let data = DATA.transactions;
        let expensesIds = [];
        for(let i = 0; i < serviceCategory.getCategories().length; i++){
            if(serviceCategory.getCategories()[i].type === 'Expenses'){
                expensesIds.push(serviceCategory.getCategories()[i].id);
            }
        }

        let countExpenses = 0.00;
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < expensesIds.length; j++){
                if(data[i].to === expensesIds[j]){
                    countExpenses += parseFloat(Math.round(data[i].amount*100))/100;
                }
            }
        }

        let expenseLabel = this.view.lblExpensesCount;
        expenseLabel.text = parseFloat(Math.round(countExpenses*100))/100;
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