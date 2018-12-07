define({ 
    goToCategories: function(){
        navToForm("frmCategoriesList");
    },

    goToEditCategory: function() {
        navToForm("frmEditCategory", {categoryId: this.categoryId});
    },

    goToHistoryDetails: function(){  
        let transDetails = this.view.segHistoryExpense.selectedRowItems;
        navToForm("frmHistoryDetails", {categoryId: this.categoryId,
                                        date: `${transDetails[0].numDay} ${transDetails[0].date}`});
    },

    onNavigate: function(category) {
        this.categoryId = category.categoryId;
    },

    showCategory: function(){
        let category = serviceCategory.getById(this.categoryId);
        this.view.txtHistoryCategory.text = category.name;
        this.view.imgHistoryCategory.src = category.icon;
    },

    onPreShow: function() {
        let incomes = this.getCategoriesByType("Income");
        let currents = this.getCategoriesByType("Current");
        let expenseByCategory = '';

        if(incomes.indexOf(this.categoryId) !== -1){
            expenseByCategory = this.getTransactionsByKeyFrom(this.categoryId);
        } else if(currents.indexOf(this.categoryId) !== -1){
            expenseByCategory = serviceTransactionsRefactored.getByCategoryId(this.categoryId);
        }else {
            expenseByCategory = serviceTransactionsRefactored.getByCategoryId(this.categoryId);
        }
        this.showHistory(expenseByCategory);
        this.view.fldHistorySearch.text = '';
        this.checkIfOwner();
    },

    showHistory: function(data) {
        let expenseByCategory = this.sortTransactions(data);
        let dates = []; 
        let fldHistorySearch = this.view.fldHistorySearch.text;
        this.view.btnHistorySearch.text = 'Search';
        for(let i = 0; i < expenseByCategory.length; i++){
            let day = getDay[expenseByCategory[i].date.getDay()];
            let numDay = expenseByCategory[i].date.getDate().toString();
            let date = getMonth[expenseByCategory[i].date.getMonth()] + ' ' + expenseByCategory[i].date.getFullYear();
            let imgTotal = 'sum.png';
            let commentary = expenseByCategory[i].commentary;
            let imgCurrency = this.setCurrencyIcon(this.categoryId);
            let isShared = '';

            let outerDateKey = expenseByCategory[i].date.getDate() + ' ' + expenseByCategory[i].date.getMonth();
            let getExpensesForSingleDay = expenseByCategory.filter(value => {
                let innerDateKey = value.date.getDate() + ' ' + value.date.getMonth();
                return outerDateKey == innerDateKey;
            });

            const index = dates.findIndex(daySum => daySum.numDay === numDay && daySum.date === date);

            if(index === -1){
                let amounts = [0];
                if(serviceCategory.getById(this.categoryId).type === CATEGORY_TYPES.INCOME){
                    for(let j = 0; j < getExpensesForSingleDay.length; j++){
                        amounts.push(getExpensesForSingleDay[j].fromAmount);
                        if(getExpensesForSingleDay[j].user_id !== CURRENT_USER.id){
                            isShared = 'share.png';
                        }
                    }
                } else if(serviceCategory.getById(this.categoryId).type === CATEGORY_TYPES.CURRENT){
                    for(let j = 0; j < getExpensesForSingleDay.length; j++){
                        if(getExpensesForSingleDay[j].from === this.categoryId){
                            amounts.push(-getExpensesForSingleDay[j].toAmount);
                        } else if(getExpensesForSingleDay[j].to === this.categoryId){
                            amounts.push(getExpensesForSingleDay[j].toAmount);
                        }

                        if(getExpensesForSingleDay[j].user_id !== CURRENT_USER.id){
                            isShared = 'share.png';
                        }
                    }
                } else if(serviceCategory.getById(this.categoryId).type === CATEGORY_TYPES.EXPENSE){
                    for(let j = 0; j < getExpensesForSingleDay.length; j++){
                        amounts.push(-getExpensesForSingleDay[j].toAmount);
                        if(getExpensesForSingleDay[j].user_id !== CURRENT_USER.id){
                            isShared = 'share.png';
                        }
                    }
                }

                let sum = amounts.reduce((prev,curr) => prev + curr); 

                // filtering
                if(fldHistorySearch) {
                    let searchString = `${day} ${numDay} ${date} ${sum} ${commentary}`.toLowerCase();
                    let searchIndex = searchString.indexOf(fldHistorySearch);
                    if(searchIndex !== -1) {
                        dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(),
                                    imgTotal: imgTotal, imgCurrency: imgCurrency, isShared: isShared});
                        this.view.btnHistorySearch.text = 'Reset';
                    } else {
                        this.view.btnHistorySearch.text = 'Reset';
                    }

                } else {
                    dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(), imgTotal: imgTotal, imgCurrency: imgCurrency, isShared: isShared});
                }
            }
        }
        if(dates.length === 0) {
            alert('Nope. There is nothing here.');
        }

        let segHistoryExpense = this.view.segHistoryExpense;
        segHistoryExpense.widgetDataMap = {
            numDay: 'numDay',
            txtDay: 'day',
            txtDate: 'date',
            txtResult: 'sum',
            imgSummary: 'imgTotal',
            imgCurrency: 'imgCurrency',
            imgIsShared: 'isShared'
        };
        segHistoryExpense.setData(dates);
    },

    sortTransactions: function(transactions){
        let sortedTransactions = transactions.sort(function(a, b){
            return b.date.getTime() - a.date.getTime();
        });
        return sortedTransactions;
    },

    getCategoriesByType: function(typeOfTransaction){
        let cetegoriesForCurrentUser = serviceCategory.getCategories().concat(serviceCategoryRefactored.getSharedCategories());
        let categories = [];
        for(let i = 0; i < cetegoriesForCurrentUser.length; i++){
            if(typeOfTransaction === cetegoriesForCurrentUser[i].type){
                categories.push(cetegoriesForCurrentUser[i].id);
            }
        }
        return categories;
    },

    getTransactionsByKeyFrom: function(categoryId){
        let transactionsForCurrentUser = serviceTransactionsRefactored.getAll();
        let transaction = [];
        for(let i = 0; i < transactionsForCurrentUser.length; i++){
            if(categoryId === transactionsForCurrentUser[i].from){
                transaction.push(transactionsForCurrentUser[i]);
            }
        }
        return transaction;
    },

    getCurrentBalance: function(){
        let initTo = [0];
        let initFrom = [0];
        let transactionsToCurrentCategory = initTo.concat(serviceTransactionsRefactored.getAllByType(this.categoryId, 'to', 'toAmount'));
        let transactionsFromCurrentCategory = initFrom.concat(serviceTransactionsRefactored.getAllByType(this.categoryId, 'from', 'fromAmount'));
        let result = transactionsToCurrentCategory.reduce((prev, curr) => prev + curr) - transactionsFromCurrentCategory.reduce((prev, curr) => prev + curr);
        return result.toFixed(2);
    },

    setCurrencyIcon: function(categoryId) {
        let currency = serviceCategory.getCurrencyById(categoryId);
        switch (currency){
            case 'UAH':
                return 'hryvnia_symbol.png';
            case 'USD':
                return 'dollar_symbol.png';
            case 'EUR':
                return 'euro_symbol.png';
            case 'PLN':
                return 'zloty_symbol.png';
        }
    },

    deleteWithTransactions: function(){
        let transactionsForCurrentUser = serviceTransactions.getTransactionForCurrentUser()
        .concat(serviceTransactionsRefactored.getAllExternalIntoMySharedCategories());
        serviceCategory.deleteById(this.categoryId);
        for(let i = 0; i < transactionsForCurrentUser.length; i++){
            if(this.categoryId === transactionsForCurrentUser[i].from || this.categoryId === transactionsForCurrentUser[i].to){
                serviceTransactions.deleteById(transactionsForCurrentUser[i].id);
            }
        }
        this.goToCategories();
    },

    deleteWithoutTransactions: function(){
        let category = serviceCategory.getById(this.categoryId);
        category.visible = false;
        this.goToCategories();
    },

    showDeleteOptions: function(){
        let flxDef = {
            0: {'centerX': '97%',
                'centerY': '3%',
                'width': '0dp',
                'height': '0dp'},
            100: {
                'centerX': '50%',
                'centerY': '50%',
                'width': '300dp',
                'height': '175dp'
            }
        };
        this.createCategoryDeleteAnimation(flxDef, 'flxDeletionOptions');
        this.view.flxDeleteCategoryContainer.setVisibility(true);
        this.view.flxDeletionOptions.setVisibility(true);
        this.view.flxDeleteConfirmation.setVisibility(false);
    },

    hideDeleteOptions: function(){
        let flxDef = {
            0: {
                'centerX': '50%',
                'centerY': '50%',
                'width': '300dp',
                'height': '175dp'
            },
            100: {'centerX': '97%',
                  'centerY': '3%',
                  'width': '0dp',
                  'height': '0dp'}

        };
        this.createCategoryDeleteAnimation(flxDef, 'flxDeletionOptions');
        kony.timer.schedule(Date.now().toString(),() => {
            this.view.flxDeleteCategoryContainer.setVisibility(false);
            this.view.flxDeletionOptions.setVisibility(false);
        }, 0.5, false);
    },

    showDeleteBtnWith: function(){
        this.view.btnWDeleteYes.setVisibility(true);
        this.view.btnWODeleteYes.setVisibility(false);
    },

    showDeleteBtnWithout: function(){
        this.view.btnWDeleteYes.setVisibility(false);
        this.view.btnWODeleteYes.setVisibility(true);
    },

    showDeleteConfirmation: function(){
        this.view.flxDeleteCategoryContainer.setVisibility(true);
        this.view.flxDeletionOptions.setVisibility(false);
        this.view.flxDeleteConfirmation.setVisibility(true);
    },

    hideDeleteConfirmation: function(){
        this.view.flxDeletionOptions.setVisibility(false);
        this.view.flxDeleteCategoryContainer.setVisibility(false);
        this.view.flxDeleteConfirmation.setVisibility(false);
    },

    createCategoryDeleteAnimation: function(animationDef, flxId){
        let config = {
            "duration": 0.5,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        let animDef = kony.ui.createAnimation(animationDef);
        this.view[flxId].animate(animDef, config, null);
    },

    checkIfOwner: function() {
        let category = serviceCategoryRefactored.getById(this.categoryId);
        if(~category.sharedUsers_id.indexOf(CURRENT_USER.id)) {
            this.view.flxUpdateCategory.isVisible = false;			
        } else {
            this.view.flxUpdateCategory.isVisible = true;
        }
    }
});