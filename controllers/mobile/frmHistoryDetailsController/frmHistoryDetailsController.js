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
        let incomes = this.filterByTypeOfTransaction("Income");
        let incomeIds = incomes.map(function(element){
            return element.id;
        });
        let expByCat = '';
        this.view.btnDetailsSearch.text = 'Search';
        let fldDetailsSearch = this.view.fldDetailsSearch.text;
        
        if(incomeIds.indexOf(this.categoryId) !== -1){
            expByCat = this.getByCategoryIdFrom(this.categoryId);
        }else{
            expByCat = serviceTransactions.getByCategoryId(categoryId);
        }

        let data = [];
        for(let i = 0; i < expByCat.length; i++){
			
            var expDate = `${expByCat[i].date.getDate()} ${getMonth[expByCat[i].date.getMonth()]} ${expByCat[i].date.getFullYear()}`;
            if(expDate === date){
                let rowData = {
                    id: expByCat[i].id,
                    from: this.getCategoryName(expByCat[i].from),
                    commentary: expByCat[i].commentary,
                    expense: serviceCategory.getById(this.categoryId).type === 'Income' ? 
                    						expByCat[i].fromAmount.toString() : 
                    						expByCat[i].toAmount.toString(),
                    to: this.getCategoryName(expByCat[i].to),
                    date: expByCat[i].date.toString(),
                    expenseTo: expByCat[i].toAmount.toString(),
                    imgDol: this.setCurrencyIconInRow(this.categoryId)
                };
                if(fldDetailsSearch) {
                    let searchString = `${rowData.commentary} ${rowData.expense} ${rowData.from}`.toLowerCase();
                    let searchIndex = searchString.indexOf(fldDetailsSearch);
                    if(searchIndex !== -1) {
                       data.push(rowData);  
                       this.view.btnDetailsSearch.text = 'Reset';
                    }
                } else {
                   data.push(rowData);  
                }
            }
        }
        if(data.length === 0) {
            alert('No matches. Try ro find something different.');
            this.view.btnDetailsSearch.text = 'Reset';
        }
        this.view.fldDetailsSearch.text = '';
        return data;
    },

    showDetails: function(){
        this.view.txtDetailsCategory.text = this.date;
        let data = this.__showDetails(this.categoryId, this.date);
        let segDetails = this.view.segDetails;
        segDetails.widgetDataMap = {
            txtFrom: 'from',
            txtCommentary: 'commentary',
            txtExpense: 'expense',
            imgDollar: 'imgDol'
        };
        segDetails.setData(data);
        
    },

    hideEditForm: function(){
        this.view.flxEdit.setVisibility(false);
        this.view.flxEditForm.setVisibility(false);
    },

    showEditForm: function(){
        this.view.flxEdit.setVisibility(true);
        this.view.flxEditForm.setVisibility(false);
    },

    showEdit: function(){
        let toggleEdit = this.view.flxEditForm;
        if(toggleEdit.isVisible){
            toggleEdit.setVisibility(false); 
            return;
        }
        toggleEdit.setVisibility(true);
    },

    clearInputs: function(){
        this.view.lstBoxTo.selectedKey = "";
        this.view.lstBoxFrom.selectedKey = "";
        this.view.inpExpense.text = "";
        this.view.inpExpenseTo.text = "";
        this.view.inpCommentary.text = "";
    },

    setEditDefaultValues: function(){
        let incomes = this.filterByTypeOfTransaction("Income");
        let incomeIds = incomes.map(function(element){
            return element.id;
        });

        if(incomeIds.indexOf(this.categoryId) !== -1){
            this.loadCategories("Income", 'lstBoxFrom');
            this.loadCategories("Current", 'lstBoxTo');          
        }else{
            this.loadCategories("Current", 'lstBoxFrom');  
            this.loadCategories("Expenses", 'lstBoxTo');            
        }
        let selRowItems = this.view.segDetails.selectedRowItems;
        let categoriesFrom = this.view.lstBoxFrom.masterData;
        let categoriesTo = this.view.lstBoxTo.masterData;
        this.view.lblTransactionId.text = selRowItems[0].id;
        this.view.lstBoxFrom.selectedKey = this.findCategoryKey(categoriesFrom, selRowItems[0].from);
        this.view.lstBoxTo.selectedKey = this.findCategoryKey(categoriesTo, selRowItems[0].to);
        this.view.inpExpense.text = selRowItems[0].expense;         
        this.view.inpExpenseTo.text = selRowItems[0].expenseTo;
        this.view.inpCommentary.text = selRowItems[0].commentary;
        let date = new Date(this.date);
        this.view.calEdit.dateComponents = [date.getDate(), date.getMonth()+1, date.getFullYear()];     
        this.view.imgCategory.src = this.findByCategoryName(selRowItems[0].to).icon;
        this.view.imgCurrency.src = this.setCurrencyIconInDetails(selRowItems[0].from);
        this.view.imgCurrencyTo.src = this.setCurrencyIconInDetails(selRowItems[0].to);

        this.view.lblShowFromValue.text = selRowItems[0].from;
        this.view.lblShowCategory.text = selRowItems[0].to;
        this.view.lblShowExpenseValue.text = selRowItems[0].expense;
        this.view.lblShowExpenseTo.text = selRowItems[0].expenseTo;
        this.view.lblShowCommValue.text = selRowItems[0].commentary;
        this.view.lblShowDateValue.text = this.date;
        this.view.imgShowCategory.src = this.findByCategoryName(selRowItems[0].to).icon;
        this.view.imgShowCurrency.src = this.setCurrencyIconInDetails(selRowItems[0].from);
        this.view.imgShowCurrencyTo.src = this.setCurrencyIconInDetails(selRowItems[0].to);
    },

    changeIconOnSelect: function(){
        let categotyName = this.view.lstBoxTo.selectedKeyValue[1];
        let cetgory = this.findByCategoryName(categotyName); 
        this.view.imgCategory.src = cetgory.icon;
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
        let id = this.view.lblTransactionId.text;

        let categotyNameFrom = this.view.lstBoxFrom.selectedKeyValue[1];
        let fromId = this.findByCategoryName(categotyNameFrom).id;

        let categotyNameTo = this.view.lstBoxTo.selectedKeyValue[1];
        let toId = this.findByCategoryName(categotyNameTo).id; 

        let fromAmount = this.view.inpExpense.text;
        let toAmount = this.view.inpExpenseTo.text;
        let comment = this.view.inpCommentary.text;
        let date = this.view.calEdit.month + ' ' + this.view.calEdit.day + ', ' + this.view.calEdit.year;

        serviceTransactions.update(id, fromId, Number(fromAmount), toId, Number(toAmount), date, comment);
        this.onEmptyPageReturn();
    },

    deleteTransaction: function(){
        let id = this.view.lblTransactionId.text;
        serviceTransactions.deleteById(id);
        this.onEmptyPageReturn();
    },

    showDeleteConfirmationWindow: function(){
        this.view.flxDeleteConfirm.setVisibility(true);
    },

    hideDeleteConfirmationWindow: function(){
        this.view.flxDeleteConfirm.setVisibility(false);
    },

    loadCategories: function(typeOfTransaction, listBoxId){
        let categories = this.filterByTypeOfTransaction(typeOfTransaction);
        let prepForList = [];
        for(var i = 0; i < categories.length; i++){
            let lblId = typeOfTransaction + i;
            prepForList.push([
                lblId.toString(), categories[i].name
            ]);
        }
        this.view[listBoxId].masterData = prepForList;
    },

    filterByTypeOfTransaction: function(typeOfTransaction){
        let categories = [];
        for(let i = 0; i < DATA.categories.length; i++){
            if(typeOfTransaction === DATA.categories[i].type){
                categories.push(DATA.categories[i]);
            }
        }
        return categories;
    }, 

    getByCategoryIdFrom: function(categoryId){
        let transaction =[];
        for(let i = 0; i < DATA.transactions.length; i++){
            if(categoryId === DATA.transactions[i].from){
                transaction.push(DATA.transactions[i]);
            }
        }
        return transaction;
    },

    findByCategoryName: function(categoryName){
        let category = DATA.categories.find(category => category.name === categoryName);
        return category;
    }, 

    getCategoryName: function(id){
        let category = DATA.categories.find(category => category.id === id);
        return category.name;
    },
    
    setCurrencyIconInRow: function(categoryId) {
        let currency = serviceCategory.getCurrencyById(categoryId);
        return this.setCurrency(currency);
    },
    
    setCurrencyIconInDetails: function(categoryName) {
        let currency = serviceCategory.getCurrencyByCatName(categoryName);
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
    }
});