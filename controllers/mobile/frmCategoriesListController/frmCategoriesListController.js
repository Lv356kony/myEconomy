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
    },

    setDafaultValues: function(){
        this.view.flxSegmIncome.height = '0%';
        this.view.flxSegmCurrent.height = '0%';
        this.view.flxSegmExpenses.height = '71.2%';
        this.view.flxSegmIncome.top = '14.8%';
        this.view.flxCurrent.top = '14.8%';
        this.view.flxSegmCurrent.top = '21.8%';
        this.view.flxExpenses.top = '21.8%';
        this.view.flxSegmExpenses.top = '28.8%';
        this.view.flxExpensesBackground.width = '100%';
        this.view.flxExpensesButton.top = '92%';
        this.view.flxCurrentButton.top = '92%';
        this.view.flxIncomeBackground.width = '0%';
        this.view.flxCurrentBackground.width = '0%';
        this.view.flxExpensesBackground.width = '100%';

    },

    createOneKeyAnimation: function(key, startPos, endPos, flxId){
        let flxDef = {};
        if(key === 'height'){
            flxDef = {
                0:{'height': startPos},
                100:{'height': endPos}
            };           
        }
        if(key === 'top'){
            flxDef = {
                0:{'top': startPos},
                100:{'top': endPos}
            };             
        }
        if(key === 'width'){
            flxDef = {
                0:{'width': startPos},
                100:{'width': endPos}
            };             
        }
        let config = {
            "duration": 0.5,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        let animDef = kony.ui.createAnimation(flxDef);
        this.view[flxId].animate(animDef, config, null);
    },

    createTwoKeyAnimation: function(heightStartPos, heightEndPos, topStartPos, topEndPos, flxId){
        let flxDef = {
            0:{'height': heightStartPos,
               'top': topStartPos},
            100:{'height': heightEndPos,
                 'top': topEndPos}
        };           
        let config = {
            "duration": 0.5,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        let animDef = kony.ui.createAnimation(flxDef);
        this.view[flxId].animate(animDef, config, null);        
    },

    showIncome: function(){
        this.timer('showIncome');
        if(categoryAnimProps.getAnimationStatus){
            categoryAnimProps.getAnimationStatus = false;
            if(this.view.flxSegmIncome.height ==='0%'){      
                this.createOneKeyAnimation('height', '0%', '71.2%','flxSegmIncome');
            }
            if(this.view.flxCurrent.top === '14.8%'){
                this.createOneKeyAnimation('top', '14.8%', '86%', 'flxCurrent');
            }
            if(this.view.flxSegmCurrent.height === '71.2%' && this.view.flxSegmCurrent.top === '21.8%'){
                this.createTwoKeyAnimation('71.2%', '0%', '21.8%', '86%', 'flxSegmCurrent');
            }
            if(this.view.flxSegmCurrent.height === '0%' && this.view.flxSegmCurrent.top === '21.8%'){
                this.createOneKeyAnimation('top', '21.8%', '86%', 'flxSegmCurrent');
            }
            if(this.view.flxExpenses.top === '21.8%'){
                this.createOneKeyAnimation('top', '21.8%', '93%', 'flxExpenses');
            }
            if(this.view.flxSegmExpenses.height === '71.2%'){
                this.createTwoKeyAnimation('71.2%', '0%', '28.8%', '93%', 'flxSegmExpenses');
            }
            this.createOneKeyAnimation('top', this.view.flxExpensesButton.top, '78%', 'flxExpensesButton');
            this.createOneKeyAnimation('top', this.view.flxCurrentButton.top, '78%', 'flxCurrentButton');
            this.createOneKeyAnimation('width', this.view.flxIncomeBackground.width, '100%', 'flxIncomeBackground');
            this.createOneKeyAnimation('width', this.view.flxCurrentBackground.width, '0%', 'flxCurrentBackground');
            this.createOneKeyAnimation('width', this.view.flxExpensesBackground.width, '0%', 'flxExpensesBackground');
        }
    },

    showCurrent: function(){
        this.timer('showCurrent');
        if(categoryAnimProps.getAnimationStatus){
            categoryAnimProps.getAnimationStatus = false;
            if(this.view.flxSegmIncome.height === '71.2%'){
                this.createOneKeyAnimation('height', '71.2%', '0%','flxSegmIncome');
            }
            if(this.view.flxCurrent.top === '86%'){
                this.createOneKeyAnimation('top', '86%', '14.8%', 'flxCurrent');
            }
            if(this.view.flxSegmCurrent.height === '0%' && this.view.flxSegmCurrent.top === '21.8%'){      
                this.createOneKeyAnimation('height', '0%', '71.2%','flxSegmCurrent');
            }
            if(this.view.flxSegmCurrent.height === '0%' && this.view.flxSegmCurrent.top === '86%'){      
                this.createTwoKeyAnimation('0%', '71.2%', '86%', '21.8%', 'flxSegmCurrent');
            }
            if(this.view.flxExpenses.top === '21.8%'){
                this.createOneKeyAnimation('top', '21.8%', '93%', 'flxExpenses');
            }
            if(this.view.flxSegmExpenses.height === '71.2%'){ 
                this.createTwoKeyAnimation('71.2%', '0%', '28.8%', '93%', 'flxSegmExpenses');
            }
            this.createOneKeyAnimation('top', this.view.flxExpensesButton.top, '85%', 'flxExpensesButton');
            this.createOneKeyAnimation('top', this.view.flxCurrentButton.top, '85%', 'flxCurrentButton');      
            this.createOneKeyAnimation('width', this.view.flxIncomeBackground.width, '0%', 'flxIncomeBackground');
            this.createOneKeyAnimation('width', this.view.flxCurrentBackground.width, '100%', 'flxCurrentBackground');
            this.createOneKeyAnimation('width', this.view.flxExpensesBackground.width, '0%', 'flxExpensesBackground');
        }
    },

    showExpense: function(){
        this.timer('showExpense');
        if(categoryAnimProps.getAnimationStatus){
            categoryAnimProps.getAnimationStatus = false;
            if(this.view.flxSegmIncome.height === '71.2%'){
                this.createOneKeyAnimation('height', '71.2%', '0%','flxSegmIncome');
            }
            if(this.view.flxCurrent.top === '86%'){
                this.createOneKeyAnimation('top', '86%', '14.8%', 'flxCurrent');
            }
            if(this.view.flxSegmCurrent.height === '71.2%'){ 
                this.createOneKeyAnimation('height', '71.2%', '0%','flxSegmCurrent');
            }
            if(this.view.flxSegmCurrent.top === '86%'){ 
                this.createOneKeyAnimation('top', '86%', '21.8%','flxSegmCurrent');
            }
            if(this.view.flxExpenses.top === '93%'){
                this.createOneKeyAnimation('top', '93%', '21.8%', 'flxExpenses');
            }
            if(this.view.flxSegmExpenses.top === '93%'){
                this.createTwoKeyAnimation('0%', '71.2%', '93%', '28.8%', 'flxSegmExpenses');
            }
            this.createOneKeyAnimation('top', this.view.flxExpensesButton.top, '92%', 'flxExpensesButton');
            this.createOneKeyAnimation('top', this.view.flxCurrentButton.top, '92%', 'flxCurrentButton'); 
            this.createOneKeyAnimation('width', this.view.flxIncomeBackground.width, '0%', 'flxIncomeBackground');
            this.createOneKeyAnimation('width', this.view.flxCurrentBackground.width, '0%', 'flxCurrentBackground');
            this.createOneKeyAnimation('width', this.view.flxExpensesBackground.width, '100%', 'flxExpensesBackground');
        }
    },

    timer: function(timerId){
        if(timerId !== categoryAnimProps.timerIdMemory){
            categoryAnimProps.timerIdMemory = timerId;
            kony.timer.schedule(timerId,() => {
                categoryAnimProps.getAnimationStatus = true;
                categoryAnimProps.timerIdMemory = '';
            }, 0.5, false);
            
        }
    }
});