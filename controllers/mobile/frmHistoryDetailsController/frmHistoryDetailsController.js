define({   
  goToHistory: function(){
    navToForm("frmHistory");
  },

  refresh: function(){
    navToForm("frmHistoryDetails");
  },

  onNavigate: function(context) 
  {
    this.date = '16 August 2018';
    this.categoryId = 1;
    //     this.date = context.date;
    //     this.categoryId = context.categoryId;
  },

  showDetails: function(){
    let expByCat = serviceTransactions.getByCategoryId(this.categoryId);
    let data = [];
    this.view.txtDetailsCategory.text = this.date;

    for(let i = 0; i < expByCat.length; i++){
      var expDate = `${expByCat[i].date.getDate()} ${getMonth[expByCat[i].date.getMonth()]} ${expByCat[i].date.getFullYear()}`;

      if(expDate === this.date){
        data.push({id: expByCat[i].id,
                   from: getCategory[expByCat[i].from],
                   commentary: expByCat[i].commentary,
                   expense: '-' + expByCat[i].amount,
                   to: getCategory[expByCat[i].to],
                   date: expByCat[i].date.toString()
                  });        
      }
    }

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
    let from = this.view.lstBoxFrom.selectedKey;
    let to = this.view.lstBoxTo.selectedKey;
    let amount = this.view.inpExpense.text;
    let comment = this.view.inpCommentary.text;
    serviceTransactions.update(id, amount, from, to, comment);
    alert(DATA.transactions);
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
  }
});