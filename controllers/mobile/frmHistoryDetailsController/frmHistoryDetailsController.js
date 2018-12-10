define({   
    goToHistory: function(){
        navToForm("frmHistory", {categoryId: this.categoryId});
    },

    refresh: function(obj){
        navToForm("frmHistoryDetails", {categoryId: obj.categoryId,
                                        date: obj.date});
    },

    onEmptyPageReturn: function(){
        let data = this.__showDetails(this.categoryId, this.date);
        if(data.length === 0){
            this.goToHistory();
        }else{
            this.refresh({categoryId: this.categoryId,
                          date: this.date});
        }        
    },

    onNavigate: function(context) 
    {
        this.date = context.date;
        this.categoryId = context.categoryId;
    },

    __showDetails: function(categoryId, date){
        const incomeIds = this.getCategoriesByType(CATEGORY_TYPES.INCOME).map(element => element.id);

        let expenseByCategory = '';
        this.view.btnDetailsSearch.text = 'Search';
        let fldDetailsSearch = this.view.fldDetailsSearch.text;

        if(incomeIds.indexOf(this.categoryId) !== -1){
            expenseByCategory = this.getTransactionsByKeyFrom(this.categoryId);
        } else {
            expenseByCategory = serviceTransactionsRefactored.getByCategoryId(categoryId);
        }

        let data = [];
        for(let i = 0; i < expenseByCategory.length; i++){
            var expDate = `${expenseByCategory[i].date.getDate()} ${getMonth[expenseByCategory[i].date.getMonth()]} ${expenseByCategory[i].date.getFullYear()}`;

            if(expDate === date){
                let whoMadeTransaction = (expenseByCategory[i].user_id === CURRENT_USER.id) ? 
                    `by: ${userServiceRefactored.getById(CURRENT_USER.id).email}` : `by: ${userServiceRefactored.getById(expenseByCategory[i].user_id).email}`;
                let cetegory = serviceCategoryRefactored.getById(this.categoryId);
                let expenseTo = '';

                if(cetegory.type === CATEGORY_TYPES.INCOME){
                    expenseTo = expenseByCategory[i].toAmount;
                } else if(cetegory.type === CATEGORY_TYPES.EXPENSE){
                    expenseTo = -expenseByCategory[i].toAmount;
                } else if(expenseByCategory[i].from === this.categoryId){
                    expenseTo = -expenseByCategory[i].toAmount;
                } else if(expenseByCategory[i].to === this.categoryId){
                    expenseTo = expenseByCategory[i].toAmount;
                }

                let rowData = {
                    id: expenseByCategory[i].id,
                    spender: whoMadeTransaction,
                    from: serviceCategoryRefactored.getById(expenseByCategory[i].from).name,
                    commentary: expenseByCategory[i].commentary,
                    expense: (cetegory.type === CATEGORY_TYPES.INCOME ||
                              (cetegory.type === CATEGORY_TYPES.CURRENT && cetegory.currency !== serviceCategoryRefactored.getById(expenseByCategory[i].to).currency) ||
                              cetegory.currency !== serviceCategoryRefactored.getById(expenseByCategory[i].from).currency) ?
                    expenseByCategory[i].fromAmount.toString() :  expenseByCategory[i].toAmount.toString(),
                    to: serviceCategoryRefactored.getById(expenseByCategory[i].to).name,
                    date: expenseByCategory[i].date.toString(),
                    expenseTo: expenseTo.toString(),
                    imgDol: this.setCurrencyIconInRow(this.categoryId)
                };
                this.toId = expenseByCategory[i].to;

                if(fldDetailsSearch) {
                    let searchString = `${rowData.commentary} ${rowData.expense} ${rowData.from}`.toLowerCase();
                    let searchIndex = searchString.indexOf(fldDetailsSearch);
                    if(searchIndex !== -1) {
                        data.push(rowData);  
                        this.view.btnDetailsSearch.text = 'Reset';

                    } else {
                        this.view.btnDetailsSearch.text = 'Reset';
                    }
                } else {
                    data.push(rowData);  
                }
            }
        }
        this.view.fldDetailsSearch.text = '';

        return data;
    },

    showDetails: function(){
        this.view.txtDetailsCategory.text = this.date;
        let data = this.__showDetails(this.categoryId, this.date);
        let segDetails = this.view.segDetails;
        let category = serviceCategoryRefactored.getById(this.categoryId);
        segDetails.widgetDataMap = {
            txtFrom: 'from',
            txtCommentary: 'commentary',
            txtExpense: category.type === CATEGORY_TYPES.INCOME ||
            (category.type === CATEGORY_TYPES.CURRENT && category.currency !== serviceCategoryRefactored.getById(this.toId).currency) ?
            'expense' : 'expenseTo',
            imgDollar: 'imgDol',
            txtMadeBy: 'spender'
        };
        segDetails.setData(data);
    },

    closeEditFormOnLoad: function(){
        this.view.flxEdit.bottom = '-400dp';
    },

    hideEditForm: function(){
        let flxDef = {
            0: {
                'bottom': '0dp'
            },
            100: {
                'bottom': '-400dp'
            }
        };
        this.createEditAnimation(flxDef, 'flxEdit');
        kony.timer.schedule('clearInputs',() => {
            this.clearInputs();
        }, 0.5, false);
    },

    showEditForm: function(){
        this.view.flxEditForm.setVisibility(false);
        if(this.view.flxEdit.bottom !== '0dp'){
            let flxDef = {
                0: {
                    'bottom': '-400dp'
                },
                100: {
                    'bottom': '0dp'
                }
            };
            this.createEditAnimation(flxDef, 'flxEdit');
        }
    },

    showEdit: function(){
        let toggleEdit = this.view.flxEditForm;
        if(toggleEdit.isVisible){
            toggleEdit.setVisibility(false); 
            return;
        }
        toggleEdit.setVisibility(true);
    },

    createEditAnimation: function(animationDef, flxId){
        let config = {
            "duration": 0.5,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        let animDef = kony.ui.createAnimation(animationDef);
        this.view[flxId].animate(animDef, config, null);
    },

    clearInputs: function(){
        this.view.lstBoxTo.selectedKey = "";
        this.view.lstBoxFrom.selectedKey = "";
        this.view.inpExpense.text = "";
        this.view.inpExpenseTo.text = "";
        this.view.inpCommentary.text = "";
    },

    setEditDefaultValues: function(){
        let incomeIds = this.getCategoriesByType(CATEGORY_TYPES.INCOME).map(element => element.id);
        let currentIds = this.getCategoriesByType(CATEGORY_TYPES.CURRENT).map(element => element.id);

        if(incomeIds.indexOf(this.categoryId) !== -1){
            this.view.lstBoxFrom.masterData = this.loadCategories(CATEGORY_TYPES.INCOME);
            this.view.lstBoxTo.masterData = this.loadCategories(CATEGORY_TYPES.CURRENT);
        } else if(currentIds.indexOf(this.categoryId) !== -1){
            this.view.lstBoxFrom.masterData = this.loadCategories(CATEGORY_TYPES.INCOME).concat(this.loadCategories(CATEGORY_TYPES.CURRENT));
            this.view.lstBoxTo.masterData = this.loadCategories(CATEGORY_TYPES.EXPENSE).concat(this.loadCategories(CATEGORY_TYPES.CURRENT));
        } else{
            this.view.lstBoxFrom.masterData = this.loadCategories(CATEGORY_TYPES.CURRENT);
            this.view.lstBoxTo.masterData = this.loadCategories(CATEGORY_TYPES.EXPENSE);
        }

        let selRowItems = this.view.segDetails.selectedRowItems;
        let categoriesFrom = this.view.lstBoxFrom.masterData;
        let categoriesTo = this.view.lstBoxTo.masterData; 
        let date = new Date(this.date);

        this.view.lblTransactionId.text = selRowItems[0].id;
        this.view.lstBoxFrom.selectedKey = this.findCategoryKey(categoriesFrom, selRowItems[0].from);
        this.view.lstBoxTo.selectedKey = this.findCategoryKey(categoriesTo, selRowItems[0].to);
        this.view.inpExpense.text = selRowItems[0].expense >= 0 ? selRowItems[0].expense : (selRowItems[0].expense * -1).toString();
        this.view.inpExpenseTo.text = selRowItems[0].expenseTo >= 0 ? selRowItems[0].expenseTo : (selRowItems[0].expenseTo * -1).toString();
        this.view.inpCommentary.text = selRowItems[0].commentary;
        this.view.calEdit.dateComponents = [date.getDate(), date.getMonth()+1, date.getFullYear()];     
        this.view.imgCategory.src = serviceCategoryRefactored.getByName(selRowItems[0].to).icon;
        this.view.imgCurrency.src = this.setCurrencyIconInDetails(selRowItems[0].from);
        this.view.imgCurrencyTo.src = this.setCurrencyIconInDetails(selRowItems[0].to);

        this.view.lblShowFromValue.text = selRowItems[0].from;
        this.view.lblShowCategory.text = selRowItems[0].to;
        this.view.lblShowExpenseValue.text = selRowItems[0].expense >= 0 ? selRowItems[0].expense : (selRowItems[0].expense * -1).toString();
        this.view.lblShowExpenseTo.text = selRowItems[0].expenseTo >= 0 ? selRowItems[0].expenseTo : (selRowItems[0].expenseTo * -1).toString();
        this.view.lblShowCommValue.text = selRowItems[0].commentary;
        this.view.lblShowDateValue.text = this.date;
        this.view.imgShowCategory.src = serviceCategoryRefactored.getByName(selRowItems[0].to).icon;
        this.view.imgShowCurrency.src = this.setCurrencyIconInDetails(selRowItems[0].from);
        this.view.imgShowCurrencyTo.src = this.setCurrencyIconInDetails(selRowItems[0].to);

        this.checkIfEqualCurrency(this.view.lblShowFromValue.text, this.view.lblShowCategory.text);
    },

    preventCategoryDuplicationOnSelect: function(mainCategory, lstBoxToCheck, lstBoxToUpdate){
        let currentIds = this.getCategoriesByType(CATEGORY_TYPES.CURRENT).map(element => element.id);
        let lstFrom = this.view.lstBoxFrom.selectedKeyValue === null ? 'Default' : this.view.lstBoxFrom.selectedKeyValue[1];
        let lstTo = this.view.lstBoxTo.selectedKeyValue === null ? "Another Default" : this.view.lstBoxTo.selectedKeyValue[1];
        if(currentIds.indexOf(this.categoryId) !== -1 && lstFrom === lstTo){
            let currentsExceptYourChoise = this.loadCategories(CATEGORY_TYPES.CURRENT).filter(element => {
                if(element.indexOf(this.view[lstBoxToCheck].selectedKeyValue[1]) === -1){
                    return element;
                }
            });
            this.view[lstBoxToUpdate].masterData = this.loadCategories(mainCategory).concat(currentsExceptYourChoise);
        }
    },

    changeIconOnSelect: function(){
        let categoryName = this.view.lstBoxTo.selectedKeyValue[1];
        this.view.imgCategory.src = serviceCategoryRefactored.getByName(categoryName).icon;
    },

    findCategoryKey: function(data, categoryName){
        for(let i = 0; i < data.length; i++){
            let indexOfCategory = data[i].indexOf(categoryName);
            if(indexOfCategory !== -1){
                return data[i][0];
            }
        }
    },

    updateTransaction: function(){
        let selRowItems = this.view.segDetails.selectedRowItems;
        let id = this.view.lblTransactionId.text;

        let categotyNameFrom = this.view.lstBoxFrom.selectedKeyValue[1];
        let from = serviceCategoryRefactored.getByName(categotyNameFrom);

        let categotyNameTo = this.view.lstBoxTo.selectedKeyValue[1];
        let to = serviceCategoryRefactored.getByName(categotyNameTo);

        let comment = this.view.inpCommentary.text;
        let date = this.view.calEdit.month + ' ' + this.view.calEdit.day + ', ' + this.view.calEdit.year;
		let fromAmount;
        let toAmount;
        
        if(from.currency === to.currency){
            fromAmount = this.view.inpExpense.text;
            toAmount = fromAmount;
        } else if(from.currency !== to.currency){
            fromAmount = this.view.inpExpense.text;
            toAmount = calculate(from.currency, to.currency, fromAmount);
        } else {
            fromAmount = this.view.inpExpense.text;
            toAmount = this.view.inpExpenseTo.text || selRowItems[0].expenseTo;              
        }

        serviceTransactionsRefactored.update(id, from.id, Number(fromAmount), to.id, Number(toAmount), date, comment);
        this.onEmptyPageReturn();
    },

    deleteTransaction: function(){
        let id = this.view.lblTransactionId.text;
        serviceTransactionsRefactored.deleteById(id);
        this.onEmptyPageReturn();
    },

    showDeleteConfirmationWindow: function(){
        this.view.flxDeleteConfirm.setVisibility(true);
    },

    hideDeleteConfirmationWindow: function(){
        this.view.flxDeleteConfirm.setVisibility(false);
    },

    loadCategories: function(typeOfTransaction){
        let categories = this.getCategoriesByType(typeOfTransaction);
        let prepForList = [];
        for(var i = 0; i < categories.length; i++){
            let lblId = typeOfTransaction + i;
            prepForList.push([
                lblId.toString(), categories[i].name
            ]);
        }
        return prepForList;
    },

    getCategoriesByType: function(typeOfTransaction){
        let cetegoriesForCurrentUser = serviceCategoryRefactored.getCategories().concat(serviceCategoryRefactored.getSharedCategories());
        return cetegoriesForCurrentUser.filter(element => {
            if(typeOfTransaction === element.type){
                return element;
            }
        });
    },

    getTransactionsByKeyFrom: function(categoryId){
        let transactionsForCurrentUser = serviceTransactionsRefactored.getAll();
        return transactionsForCurrentUser.filter(element => {
            if(categoryId === element.from){
                return element;
            }
        });
    },

    setCurrencyIconInRow: function(categoryId) {
        let currency = serviceCategoryRefactored.getCurrencyById(categoryId);
        return this.setCurrency(currency);
    },

    setCurrencyIconInDetails: function(categoryName) {
        let currency = serviceCategoryRefactored.getCurrencyByCatName(categoryName);
        return this.setCurrency(currency);
    },

    setCurrency: function(currency) {
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

    checkIfEqualCurrency: function(categoryFrom, categoryTo) {
        const currencyFrom = serviceCategoryRefactored.getCurrencyByCatName(categoryFrom);
        const currencyTo = serviceCategoryRefactored.getCurrencyByCatName(categoryTo);
        if(currencyFrom === currencyTo) {
            this.view.flxShowExpenseTo.isVisible = false;
            this.view.flxExpenseTo.isVisible = false;
            this.view.flxCommentary.top = '150dp';
            this.view.flxDate.top = '200dp';
            this.view.flxShowCommentary.top = '150dp';
            this.view.flxShowDate.top = '200dp';
        } else {
            this.view.flxShowExpenseTo.isVisible = true;
            this.view.flxExpenseTo.isVisible = true;
            this.view.flxCommentary.top = '200dp';
            this.view.flxDate.top = '250dp';
            this.view.flxShowCommentary.top = '200dp';
            this.view.flxShowDate.top = '250dp';
        }
    }
});