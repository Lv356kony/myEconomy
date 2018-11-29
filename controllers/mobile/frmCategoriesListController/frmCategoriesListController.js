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
        this.view.flxSegmIncome.height = '0%';
        this.view.flxSegmCurrent.height = '0%';
        this.view.flxSegmExpenses.height = '71.2%';
        this.view.flxCurrent.top = '14.8%';
        this.view.flxSegmCurrent.top = '21.8%';
        this.view.flxExpenses.top = '21.8%';
        this.view.flxSegmExpenses.top = '27.8%';
    },

    //     elemPostions: function(){
    //         let calcHeightOfIncomeSeg = this.getNumberOfCategories('Income') * 60;
    //         let calcHeightOfCurrentSeg = this.getNumberOfCategories('Current') * 60;
    //         let calcHeightOfExpenseSeg = this.getNumberOfCategories('Expenses') * 60;
    //         let incomeFlxTopPosition = parseInt(this.view.flxIncome.top);
    //         let incomeSegmTopPosition = parseInt(this.view.flxSegmIncome.top);
    //         let currentFlxTopPosition = parseInt(this.view.flxCurrent.top);
    //         let currentSegTopPosition = parseInt(this.view.flxSegmCurrent.top);
    //         let expensesFlxTopPosition = parseInt(this.view.flxExpenses.top);
    //         let expensesSegTopPosition = parseInt(this.view.flxSegmExpenses.top);
    //     },

    //     showIncome: function(){
    //         let incomeSegDef = {};
    //         let config = {};
    //         if(parseFloat(this.view.flxSegmIncome.height) !== 71.2){
    //             this.hideExpense();
    //             this.hideCurrent();
    //             this.moveFlx('21.8%', '93%', 'flxExpenses');
    //             this.moveFlx('14.8%', '86%', 'flxCurrent');
    //             incomeSegDef = {
    //                 0:{"height": '0%'},
    //                 100:{"height": '71.2%'}
    //             };
    //             config = {
    //                 "duration": 1,
    //                 "iterationCount": 1,
    //                 "delay": 0,
    //                 "fillMode": kony.anim.FILL_MODE_FORWARDS
    //             };
    //             let incSegDef = kony.ui.createAnimation(incomeSegDef);
    //             this.view.flxSegmIncome.animate(incSegDef, config, null);
    //         }        
    //     },

    //     hideIncome: function(){
    //         let incomeSegDef = {};
    //         let config = {};
    //         if(parseFloat(this.view.flxSegmIncome.height) === 71.2){
    //             this.moveFlx('93%', '21.8%', 'flxExpenses');
    //             if(this.view.flxCurrent.top !== '14.8%'){
    //                 this.moveFlx('86%', '14.8%', 'flxCurrent');
    //             }
    //             incomeSegDef = {
    //                 0:{"height": '71.2%'},
    //                 100:{"height": '0%'}
    //             };
    //             config = {
    //                 "duration": 1,
    //                 "iterationCount": 1,
    //                 "delay": 0,
    //                 "fillMode": kony.anim.FILL_MODE_FORWARDS
    //             };
    //             let incSegDef = kony.ui.createAnimation(incomeSegDef);
    //             this.view.flxSegmIncome.animate(incSegDef, config, null);
    //         }        
    //     },

    //     showCurrent: function(){
    //         let currentSegDef = {};
    //         let config = {};
    //         if(parseFloat(this.view.flxSegmCurrent.height) !== 71.2){
    //             this.hideIncome();
    //             this.hideExpense();
    //             if(this.view.flxExpenses.top !== '93%'){
    //                 this.moveFlx('21.8%', '93%', 'flxExpenses');
    //             }
    //             if(this.view.flxSegmCurrent.top !== 86){
    //                 currentSegDef = {
    //                     0:{"top": "86%",
    //                        "height": '0%'},
    //                     100:{"top": "21.8%",
    //                          "height": '71.2%'}
    //                 };               
    //             }else{
    //                 currentSegDef = {
    //                     0:{"height": '0%'},
    //                     100:{"height": '71.2%'}
    //                 };    
    //             }

    //             config = {
    //                 "duration": 1,
    //                 "iterationCount": 1,
    //                 "delay": 0,
    //                 "fillMode": kony.anim.FILL_MODE_FORWARDS
    //             };
    //             let currSegDef = kony.ui.createAnimation(currentSegDef);
    //             this.view.flxSegmCurrent.animate(currSegDef, config, null);
    //         }
    //     },

    //     hideCurrent: function(){
    //         let currentSegDef = {};
    //         let config = {};
    //         if(parseFloat(this.view.flxSegmCurrent.height) === 71.2){
    //             if(this.view.flxExpenses.top !== '21.8%'){
    //                 this.moveFlx('93%', '21.8%', 'flxExpenses');
    //             }
    //             currentSegDef = {
    //                 0:{"top": "21.8",
    //                    "height": '71.2%'},
    //                 100:{"top": "86%",
    //                      "height": '0%'}
    //             };
    //             config = {
    //                 "duration": 1,
    //                 "iterationCount": 1,
    //                 "delay": 0,
    //                 "fillMode": kony.anim.FILL_MODE_FORWARDS
    //             };
    //             let currSegDef = kony.ui.createAnimation(currentSegDef);
    //             this.view.flxSegmCurrent.animate(currSegDef, config, null);
    //         }
    //     },

    //     showExpense: function(){
    //         let expenseSegDef = {};
    //         let config = {};
    //         if(parseFloat(this.view.flxSegmExpenses.height) !== 71.2){
    //             this.hideIncome();
    //             this.hideCurrent();
    //             if(this.view.flxCurrent.top !== '14.8%'){
    //                 this.moveFlx('86%', '14.8%', 'flxCurrent');
    //             }
    //             if(this.view.flxExpenses.top !== '21.8%'){
    //                 this.moveFlx('93%', '21.8%', 'flxExpenses');
    //             }
    //             expenseSegDef = {
    //                 0:{"top": "93%",
    //                    "height": '0%'},
    //                 100:{"top": "28.8%",
    //                      "height": '71.2%'}
    //             };
    //             config = {
    //                 "duration": 1,
    //                 "iterationCount": 1,
    //                 "delay": 0,
    //                 "fillMode": kony.anim.FILL_MODE_FORWARDS
    //             };
    //             let expSegDef = kony.ui.createAnimation(expenseSegDef);
    //             this.view.flxSegmExpenses.animate(expSegDef, config, null);
    //         }
    //     },

    //     hideExpense: function(){
    //         let expenseSegDef = {};
    //         let config = {};
    //         if(parseFloat(this.view.flxSegmExpenses.height) === 71.2){     
    //             expenseSegDef = {
    //                 0:{"top": "21.8%",
    //                    "height": '71.2%'},
    //                 100:{"top": "93%",
    //                      "height": '0%'}
    //             };
    //             config = {
    //                 "duration": 1,
    //                 "iterationCount": 1,
    //                 "delay": 0,
    //                 "fillMode": kony.anim.FILL_MODE_FORWARDS
    //             };
    //             let expSegDef = kony.ui.createAnimation(expenseSegDef);
    //             this.view.flxSegmExpenses.animate(expSegDef, config, null); 
    //         }

    //     },

    //     changeFlxHeight: function(){
    //         let incomeSegDef = {};
    //         let config = {};
    //         if(parseFloat(this.view.flxSegmIncome.height) === 71.2){
    //             incomeSegDef = {
    //                 0:{"height": '71.2%%'},
    //                 100:{"height": '0%'}
    //             };
    //             config = {
    //                 "duration": 1,
    //                 "iterationCount": 1,
    //                 "delay": 0,
    //                 "fillMode": kony.anim.FILL_MODE_FORWARDS
    //             };
    //             let incSegDef = kony.ui.createAnimation(incomeSegDef);
    //             this.view.flxSegmIncome.animate(incSegDef, config, null);
    //         }        
    //     },

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
        let config = {
            "duration": 1,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        let animDef = kony.ui.createAnimation(flxDef);
        this.view[flxId].animate(animDef, config, null);
    },
    
    createTwoKeyAnimation: function(){}

    defaultValues: function(prop){
        let incomesFlx = '7.8%';
        let incomesSegFlx = '14.8%';
        let currentsFlx = '14.8%';
        let currentsSegFlx = '21.8%';
        let expensesFlx = '21.8%';
        let expensesSegFlx = '28.8%';
        let segHeight = '71.2%';
    },

    showIncome: function(){
        if(this.view.flxSegmCurrent.height === '71.2%'){
            this.createAnimation('height', '71.2%', '0%','flxSegmCurrent');
            this.createAnimation('top', '21.8%', '86%','flxSegmCurrent');
        }
        if(this.view.flxSegmExpenses.height === '71.2%'){       
            this.createAnimation('height', '71.2%', '0%','flxSegmExpenses');
            this.createAnimation('top', '28.8%', '93%','flxSegmExpenses');
        }
        if(this.view.flxCurrent.top === '14.8%'){
            this.createOneKeyAnimation('top', '14.8%', '86%', 'flxCurrent');
        }
        if(this.view.flxExpenses.top === '21.8%'){
            this.createOneKeyAnimation('top', '21.8%', '93%', 'flxExpenses');
        }
        if(this.view.flxSegmIncome.height !== '71.2%'){      
            this.createOneKeyAnimation('height', '0%', '71.2%','flxSegmIncome');
        }
    },

    showCurrent: function(){
        if(this.view.flxSegmIncome.height === '71.2%'){
            this.createOneKeyAnimation('height', '71.2%', '0%','flxSegmIncome');
        }
        if(this.view.flxSegmExpenses.height === '71.2%'){       
            this.createAnimation('height', '71.2%', '0%','flxSegmExpenses');
            this.createAnimation('top', '28.8%', '93%','flxSegmExpenses');
        }
        if(this.view.flxExpenses.top === '21.8%'){
            this.createOneKeyAnimation('top', '21.8%', '93%', 'flxExpenses');
        }
        if(this.view.flxCurrent.top !== '14.8%'){
            this.createAnimation('top', '86%', '14.8%', 'flxCurrent');
            this.createAnimation('top', '86%', '21.8%','flxSegmCurrent');
        }
        if(this.view.flxSegmCurrent.height !== '71.2%'){      
            this.createOneKeyAnimation('height', '0%', '71.2%','flxSegmCurrent');
        }
    },

    getNumberOfCategories: function(type){
        let categories = serviceCategory.getCategories();
        return categories.filter(category => category.type === type).length;
    }
});