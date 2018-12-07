define({ 

    initIncomeCategoriesList: function(){
        let incomeCategories = [];
        let categories = serviceCategoryRefactored.getCategories();
        for (let i = 0; i < categories.length; i++) {
            let symbol = this.getCarenncySymbolForCategory(categories[i].id);
            if(categories[i].type === "Income" && categories[i].visible){
                incomeCategories.push({
                    name: categories[i].name,
                    icon: categories[i].icon,
                    balance: `${serviceCategoryRefactored.getBalanceByType(categories[i].id)} ${symbol}`,
                    id:  categories[i].id
                });
            }
        }
        let segment = this.view.segmIncome;
        segment.widgetDataMap = {
            lblCategories: "name",
            icnCategories: "icon",
            lblBalance: "balance",
            imgShare: ""
        };
        segment.setData(incomeCategories);
    },

    initCurrentCategoriesList: function(){
        let currentCategories = [];
        let categories = serviceCategoryRefactored.getCategories()
        .concat(serviceCategoryRefactored.getSharedCategories());
        let externalTransations = serviceTransactionsRefactored.getAllExternalIntoMySharedCategories();
        for (let i = 0; i < categories.length; i++) {
            let symbol = this.getCarenncySymbolForCategory(categories[i].id);
            if(categories[i].type === "Current" && categories[i].visible){
                let income = serviceCategoryRefactored.getBalanceByType(categories[i].id);
                externalTransations.filter(trans => {
                    if (trans.to === categories[i].id) {
                        return trans;
                    }
                }).forEach(trans => income += trans.toAmount);
                let expenses = this.getExpensesFromCurrentCategory(categories[i].id);
                currentCategories.push({
                    name: categories[i].name,
                    icon: categories[i].icon,
                    balance: `${income - expenses} ${symbol}`,
                    id:  categories[i].id,
                    sharedUsers_id: categories[i].sharedUsers_id,
                    share: ""
                });
            }
        }

        currentCategories.forEach( (category) => {
            let sharedUsers = category.sharedUsers_id.length;
            if(  sharedUsers ){
                let userId = CURRENT_USER.id;
                let search = ~category.sharedUsers_id.indexOf(userId);
                if(search){
                    category.share = "sharepeople.png"; 
                } else 
                    category.share = "network.png";
            } 
            else {
                category.share = "";
            }    
        });

        let segment = this.view.segmCurrent;
        segment.widgetDataMap = {
            lblCategories: "name",
            icnCategories: "icon",
            lblBalance: "balance",
            imgShare: "share"
        };
        segment.setData(currentCategories);
    },

    getExpensesFromCurrentCategory: function (categoryId) {
        let balance = 0;
        let transactions = serviceTransactionsRefactored.getAll()
        .concat(serviceTransactionsRefactored.getAllExternalFromSharedCategories());
        let filter = transactions.filter((element, i) => {
            if(element.from === categoryId) {
                return element;
            }
        }).map(i => i.fromAmount).forEach(i => balance += i);
        return balance;

    },

    initExpensesCategoriesList: function(){
        let expensesCategories = [];
        let categories = serviceCategoryRefactored.getCategories()
        .concat(serviceCategoryRefactored.getSharedCategories());
        for (let i = 0; i < categories.length; i++) {
            let symbol = this.getCarenncySymbolForCategory(categories[i].id);
            if(categories[i].type === "Expenses" && categories[i].visible){
                expensesCategories.push({
                    name: categories[i].name,
                    icon: categories[i].icon,
                    balance: `${serviceCategoryRefactored.getBalanceByType(categories[i].id)} ${symbol}`,
                    id:  categories[i].id,
                    sharedUsers_id: categories[i].sharedUsers_id,
                    share: ""
                });
            }
        }
        expensesCategories.forEach( (category) => {
            let sharedUsers = category.sharedUsers_id.length;
            if(  sharedUsers ){
                let userId = CURRENT_USER.id;
                let search = ~category.sharedUsers_id.indexOf(userId);
                if(search){
                    category.share = "sharepeople.png"; 
                } else 
                    category.share = "network.png";
            } else {
                category.share = "";
            }    
        });
        let segment = this.view.segmExpenses;
        segment.widgetDataMap = {
            lblCategories: "name",
            icnCategories: "icon",
            lblBalance: "balance",
            imgShare: "share"
        };
        segment.setData(expensesCategories);
    },

    goToHistory: function(seguiWidget){
        let currentCategory = this.view[seguiWidget.id].selectedRowItems;
        navToForm("frmHistory", {categoryId : currentCategory[0].id} );

    },

    goToStatistics: function(){
        this.view.flxSideMenuContainer.left = '-100%';
        navToForm("frmStatistics");
    },

    goToExpensesHistory: function(){
        this.view.flxSideMenuContainer.left = '-100%';
        navToForm("frmExpensesHistory");
    },

    goToSettings: function(){
        this.view.flxSideMenuContainer.left = '-100%';
        navToForm("frmSettings");
    },
    showMenu: function(){
        let flxDef = {
            0:{'left': '-100%'},
            100:{'left': '0%'}
        };  
        this.createSideMenuAnimation(flxDef, 'flxSideMenu');
        this.createSideMenuAnimation(flxDef, 'flxHideMenu');
        this.view.flxSideMenuContainer.left = '0%';
    },

    hideMenu: function(){
        let flxDef = {
            0:{'left': '0%'},
            100:{'left': '-100%'}
        };  
        this.createSideMenuAnimation(flxDef, 'flxSideMenu');
        this.createSideMenuAnimation(flxDef, 'flxHideMenu');
        kony.timer.schedule(Date.now().toString(),() => {
            this.view.flxSideMenuContainer.left = '-100%';
        }, 0.5, false);

    },

    createSideMenuAnimation: function(animationDef, flxId){
        let config = {
            "duration": 0.5,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        let animDef = kony.ui.createAnimation(animationDef);
        this.view[flxId].animate(animDef, config, null);        
    },

    showUserInfo: function(){
        this.view.txtUserEmail.text = userService.getById(CURRENT_USER.id).email;
    },
    logOut: function(){
        CURRENT_USER.id = undefined;
        navToForm("frmLogin");
    },

    calculateIncomeBalance: function(){
        let incomeLabel = this.view.lblIncomeCount;
        incomeLabel.text = `${serviceCategoryRefactored.getIncomeBalance()} ${this.getCarenncySymbolForCurrentUser()}`;
    },

    calculateCurrentBalance: function(){
        let incomeLabel = this.view.lblCurrentCount;
        incomeLabel.text = `${serviceCategoryRefactored.getCurrentBalance(true)} ${this.getCarenncySymbolForCurrentUser()}`;
    },

    calculateExpensesBalance: function(){
        let expensesLabel = this.view.lblExpensesCount;
        expensesLabel.text = `${serviceCategoryRefactored.getExpenseBalance(true)} ${this.getCarenncySymbolForCurrentUser()}`;
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

    getCarenncySymbolForCurrentUser: function (){
        let currency = userServiceRefactored.getById(CURRENT_USER.id).currency;
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