define({ 

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
                    countIncome += parseFloat(Math.round(data[i].fromAmount*100))/100;
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
                    countExpenses += parseInt(data[i].toAmount);
                }
            }
        }
        let expensesLabel = this.view.lblExpensesCount;
        expensesLabel.text = parseFloat(Math.round(countExpenses*100))/100;
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

    onInit: function(){
        this.view.flxSegmIncome.height = '0dp';
        this.view.flxSegmCurrent.height = '0dp';
        this.view.flxSegmExpenses.height = '0dp';
        this.view.flxCurrent.top = '106dp';
        this.view.flxSegmCurrent.top = '156dp';
        this.view.flxExpenses.top = '156dp';
        this.view.flxSegmExpenses.top = '206dp';
    },

//     elements: {
//                 calcHeightOfIncomeSeg: this.getNumberOfCategories('Income') * 60,
//                 calcHeightOfCurrentSeg: this.getNumberOfCategories('Current') * 60,
//                 calcHeightOfExpenseSeg: this.getNumberOfCategories('Expenses') * 60,
//                 incomeFlxTopPosition: parseInt(this.view.flxIncome.top),
//                 incomeSegmTopPosition: parseInt(this.view.flxSegmIncome.top),
//                 currentFlxTopPosition: parseInt(this.view.flxCurrent.top),
//                 currentSegTopPosition: parseInt(this.view.flxSegmCurrent.top),
//                 expensesFlxTopPosition: parseInt(this.view.flxExpenses.top),
//                 expensesSegTopPosition: parseInt(this.view.flxSegmExpenses.top)
//     },

    onIncomeClick: function(){
        let calcHeightOfIncomeSeg = this.getNumberOfCategories('Income') * 60;
        let calcHeightOfCurrentSeg = this.getNumberOfCategories('Current') * 60;
        let calcHeightOfExpenseSeg = this.getNumberOfCategories('Expenses') * 60;
        let incomeFlxTopPosition = parseInt(this.view.flxIncome.top);
        let incomeSegmTopPosition = parseInt(this.view.flxSegmIncome.top);
        let currentFlxTopPosition = parseInt(this.view.flxCurrent.top);
        let currentSegTopPosition = parseInt(this.view.flxSegmCurrent.top);
        let expensesFlxTopPosition = parseInt(this.view.flxExpenses.top);
        let expensesSegTopPosition = parseInt(this.view.flxSegmExpenses.top);
        let incomeSegDef = {};
        let currentFlxDef = {};
        let currentSegDef = {};
        let expenseFlxDef = {};
        let expenseSegDef = {};
        let config = {};
		alert(this.view.flxSegmIncome.height);
        if(parseInt(this.view.flxSegmIncome.height) === calcHeightOfIncomeSeg){
            incomeSegDef = {
                0:{'height': calcHeightOfIncomeSeg + 'dp'},
                100:{'height': '0dp'}
            };
            currentFlxDef = {
                0:{"top": currentFlxTopPosition + 'dp'},
                100:{"top": currentFlxTopPosition - calcHeightOfIncomeSeg + 'dp'}
            };
            currentSegDef = {
                0:{"top": currentSegTopPosition + 'dp'},
                100:{"top": currentSegTopPosition - calcHeightOfIncomeSeg + 'dp'}                
            };
            expenseFlxDef = {
                0:{"top": expensesFlxTopPosition + 'dp'},
                100:{"top": expensesFlxTopPosition - calcHeightOfIncomeSeg + 'dp'}
            };
            expenseSegDef = {
                0:{"top": expensesSegTopPosition + 'dp'},
                100:{"top": expensesSegTopPosition - calcHeightOfIncomeSeg + 'dp'}
            };
            config = {
                "duration": 3,
                "iterationCount": 1,
                "delay": 1,
                "fillMode": kony.anim.FILL_MODE_BACKWARDS
            };
        }else{
            incomeSegDef = {
                0:{'height': '0dp'},
                100:{'height': calcHeightOfIncomeSeg + 'dp'}
            };
            currentFlxDef = {
                0:{"top": currentFlxTopPosition + 'dp'},
                100:{"top": currentFlxTopPosition + calcHeightOfIncomeSeg + 'dp'}
            };
            currentSegDef = {
                0:{"top": currentSegTopPosition + 'dp'},
                100:{"top": currentSegTopPosition + calcHeightOfIncomeSeg + 'dp'}
            };

            expenseFlxDef = {
                0:{"top": expensesFlxTopPosition + 'dp'},
                100:{"top": expensesFlxTopPosition + calcHeightOfIncomeSeg + 'dp'}
            };
            expenseSegDef = {
                0:{"top": expensesSegTopPosition + 'dp'},
                100:{"top": expensesSegTopPosition + calcHeightOfIncomeSeg + 'dp'}
            };
            config = {
                "duration": 3,
                "iterationCount": 1,
                "delay": 1,
                "fillMode": kony.anim.FILL_MODE_FORWARDS
            };
        }

        let incSegDef = kony.ui.createAnimation(incomeSegDef);
        let currFlxDef = kony.ui.createAnimation(currentFlxDef);
        let currSegDef = kony.ui.createAnimation(currentSegDef);
        let expFlxDef = kony.ui.createAnimation(expenseFlxDef);
        let expSegDef = kony.ui.createAnimation(expenseSegDef);
        this.view.flxSegmIncome.animate(incSegDef, config, null);
        this.view.flxCurrent.animate(currFlxDef, config, null);
        this.view.flxSegmCurrent.animate(currSegDef, config, null);
        this.view.flxExpenses.animate(expFlxDef, config, null);
        this.view.flxSegmExpenses.animate(expSegDef, config, null);
    },

    onExpenseClick: function(){
        let calcHeightOfExpenseSeg = this.getNumberOfCategories('Expenses') * 60;
        let expensesSegTopPosition = parseInt(this.view.flxSegmExpenses.top);
        let expenseSegDef = {};
        let config = {};
        alert(parseInt(this.view.flxSegmExpenses.height));
        if(parseInt(this.view.flxSegmExpenses.height) === 400){
            expenseSegDef = {
                0:{"height": '400dp'},
                //100:{"height": expensesSegTopPosition - calcHeightOfExpenseSeg + 'dp'}
                100:{"height": '0dp'}
            };
            config = {
                "duration": 1,
                "iterationCount": 1,
                "delay": 0,
                "fillMode": kony.anim.FILL_MODE_FORWARDS
            };
        }else{
            expenseSegDef = {
                0:{"height": '0dp'},
                //100:{"height": expensesSegTopPosition + calcHeightOfExpenseSeg + 'dp'}
                100:{"height": '400dp'}
            };
            config = {
                "duration": 1,
                "iterationCount": 1,
                "delay": 0,
                "fillMode": kony.anim.FILL_MODE_FORWARDS
            };
        }

        let expSegDef = kony.ui.createAnimation(expenseSegDef);
        this.view.flxSegmExpenses.animate(expSegDef, config, null);
    },

    getNumberOfCategories: function(type){
        let categories = serviceCategory.getCategories();
        return categories.filter(category => category.type === type).length;
    }
});