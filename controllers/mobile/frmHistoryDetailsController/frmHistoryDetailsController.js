define({   
    goToHistory: function(){
        navToForm("frmHistory", {categoryId: this.categoryId});
    },

    refresh: function(){
        navToForm("frmHistoryDetails", {categoryId: this.categoryId,
                          				date: this.date});
    },

    onNavigate: function(context) 
    {
        this.date = context.date;
        this.categoryId = context.categoryId;
    },
    
    __showDetails: function(categoryId, date){
        let expByCat = serviceTransactions.getByCategoryId(categoryId);
        let data = [];


        for(let i = 0; i < expByCat.length; i++){
            var expDate = `${expByCat[i].date.getDate()} ${getMonth[expByCat[i].date.getMonth()]} ${expByCat[i].date.getFullYear()}`;
            if(expDate === date){
                data.push({id: expByCat[i].id,
                           from: serviceCategory.getById(expByCat[i].from).name,
                           commentary: expByCat[i].commentary,
                           expense: expByCat[i].amount.toString(),
                           to: serviceCategory.getById(expByCat[i].to).name,
                           date: expByCat[i].date.toString()
                          });        
            }
        }
        return data;
    },

    showDetails: function(){
//         let expByCat = serviceTransactions.getByCategoryId(this.categoryId);
//         let data = [];
//         this.view.txtDetailsCategory.text = this.date;

//         for(let i = 0; i < expByCat.length; i++){
//             var expDate = `${expByCat[i].date.getDate()} ${getMonth[expByCat[i].date.getMonth()]} ${expByCat[i].date.getFullYear()}`;
//             if(expDate === this.date){
//                 data.push({id: expByCat[i].id,
//                            from: getCategory[expByCat[i].from],
//                            commentary: expByCat[i].commentary,
//                            expense: expByCat[i].amount.toString(),
//                            to: getCategory[expByCat[i].to],
//                            date: expByCat[i].date.toString()
//                           });        
//             }
//         }
        this.view.txtDetailsCategory.text = this.date;
        let data = this.__showDetails(this.categoryId, this.date);
        let segDetails = this.view.segDetails;
        segDetails.widgetDataMap = {
            txtFrom: 'from',
            txtCommentary: 'commentary',
            txtExpense: 'expense'
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

    setEditDefaultValues: function(){
        let selRowItems = this.view.segDetails.selectedRowItems;
        let categoriesFrom = this.view.lstBoxFrom.masterData;
        let categoriesTo = this.view.lstBoxTo.masterData;
        let view = this.view;

        view.lblTransactionId.text = selRowItems[0].id;
        view.lstBoxFrom.selectedKey = this.findCategoryKey(categoriesFrom, selRowItems[0].from);
        view.lstBoxTo.selectedKey = this.findCategoryKey(categoriesTo, selRowItems[0].to);
        view.inpExpense.text = selRowItems[0].expense;
        view.inpCommentary.text = selRowItems[0].commentary;
        let date = new Date(this.date);
        view.calEdit.dateComponents = [date.getDate(), date.getMonth()+1, date.getFullYear()];


        view.lblShowFromValue.text = selRowItems[0].from;
        view.lblShowCategory.text = selRowItems[0].to;
        view.lblShowExpenseValue.text = selRowItems[0].expense;
        view.lblShowCommValue.text = selRowItems[0].commentary;
        view.lblShowDateValue.text = this.date;
    },

    findCategoryKey: function(data, categoryName){
        for(let i = 0; i < data.length; i++){
            let indexOfCategory = data[i].indexOf(categoryName);
            if(indexOfCategory !== -1){
                return data[i][0];
            }
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

    clearInputs: function(){
        this.view.lstBoxTo.selectedKey = "";
        this.view.lstBoxFrom.selectedKey = "";
        this.view.inpExpense.text = "";
        this.view.inpCommentary.text = "";
    },

    updateTransaction: function(){
        let id = this.view.lblTransactionId.text;
        let categotyNameFrom = this.view.lstBoxFrom.selectedKeyValue[1];
        let fromId = this.findByCategoryName(categotyNameFrom);
        let categotyNameTo = this.view.lstBoxTo.selectedKeyValue[1];
        let toId = this.findByCategoryName(categotyNameTo); 
        let amount = this.view.inpExpense.text;
        let comment = this.view.inpCommentary.text;
        let date = this.view.calEdit.month + ' ' + this.view.calEdit.day + ', ' + this.view.calEdit.year;

        serviceTransactions.update(id, Number(amount), fromId, toId, date, comment);
    },

    showDeleteConfirmationWindow: function(){
        this.view.flxDeleteConfirm.setVisibility(true);
    },

    hideDeleteConfirmationWindow: function(){
        this.view.flxDeleteConfirm.setVisibility(false);
    },

    deleteTransaction: function(){
        let id = this.view.lblTransactionId.text;
        serviceTransactions.deleteById(id);
         let data = this.__showDetails(this.categoryId, this.date);
        if(data.length === 0){
            this.goToHistory();
        }else{
            this.refresh();
        }     
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

    findByCategoryName: function(categoryName){
        let category = '';
        for(let i = 0; i < DATA.categories.length; i++) {
            if(DATA.categories[i].name === categoryName) {
                category = DATA.categories[i].id;
            }
        }
        return category;
    }

});