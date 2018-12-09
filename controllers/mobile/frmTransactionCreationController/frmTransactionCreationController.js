define({ 

    onNavigate: function(context) 
    {
        this.category = context.categoryType;
    },


    init: function () {
        this.setDefaultDate();
        this.setListBoxData();
        this.selectionFromCategory();
        this.selectionToCategory();
        this.view.txbTransactionAmount.text = "";
        this.view.txbTransactionComentarry.text = "";
        this.view.flxErrorContainer.isVisible = "false";
    },


    clickSaveButton: function () {
        this.createTransaction();
    },


    clickBackwardButton: function () {
        navToForm("frmCategoriesList");
    },

    selectionFromCategory : function (){
        this.view.imgCategoryFrom.src = this.getSelectedCategory("from").icon;
    },


    selectionToCategory : function (){
        this.view.imgCategoryTo.src = this.getSelectedCategory("to").icon;
    },


    createTransaction: function() {
        let id = new Date().getTime();
        let from = this.getSelectedCategory("from").id;
        let fromAmount = this.view.txbTransactionAmount.text;
        let to = this.getSelectedCategory("to").id;
        let toAmount =  this.view.txtExchange.text;
        let userId = CURRENT_USER.id;
        let date = this.view.calTransactionDate.formattedDate;
        let comment = this.view.txbTransactionComentarry.text;
        if (fromAmount) {
            serviceTransactions.create(id, fromAmount, from, to, userId, date, comment, toAmount);
            navToForm("frmCategoriesList");
        } else {
            this.view.flxErrorContainer.isVisible = "true";
        }
    },

    getDataForListBox: function (categoryType) {
        let category = serviceCategory.getCategories();
        const sharedCategories = serviceCategoryRefactored.getSharedCategories();
        let dataForFrom = category.concat(sharedCategories)
        .filter((obj) => {
            if (obj.type === categoryType) {
                return obj;
            }
        })
        .map((obj) => {
            return[obj.id, obj.name];
        });
        return dataForFrom;
    },


    setListBoxData: function () {
        let category = serviceCategory.getCategories();
        let listBoxFrom = this.view.lstTransactionFrom;
        let listBoxTo = this.view.lstTransactionTo;
        let dataFrom = [];
        let dataTo = [];
        if (this.category === CATEGORY_TYPES.EXPENSE) {
            dataFrom = this.getDataForListBox(CATEGORY_TYPES.CURRENT);
            dataTo = this.getDataForListBox(CATEGORY_TYPES.EXPENSE)
                .concat(this.getDataForListBox(CATEGORY_TYPES.CURRENT));
        } else {
            dataFrom = this.getDataForListBox(CATEGORY_TYPES.INCOME);
            dataTo = this.getDataForListBox(CATEGORY_TYPES.CURRENT);
        }
        listBoxFrom.masterData = dataFrom;
        listBoxFrom.selectedKey = dataFrom[0][0];
        listBoxTo.masterData = dataTo;
        listBoxTo.selectedKey = dataTo[0][0];
    },

    preventCategoryDuplicationOnSelect: function(mainCategory, lstBoxToCheck, lstBoxToUpdate){
        let lstFrom = this.view.lstTransactionFrom.selectedKeyValue === null ? 'Default' : this.view.lstTransactionFrom.selectedKeyValue[1];
        let lstTo = this.view.lstTransactionTo.selectedKeyValue === null ? "Another Default" : this.view.lstTransactionTo.selectedKeyValue[1];
        if(lstFrom === lstTo){
            let currentsExceptYourChoise = this.loadCategories(CATEGORY_TYPES.CURRENT).filter(element => {
                if(element.indexOf(this.view[lstBoxToCheck].selectedKeyValue[1]) === -1){
                    return element;
                }
            });
            this.view[lstBoxToUpdate].masterData = this.loadCategories(mainCategory).concat(currentsExceptYourChoise);
        }
    },

    getCategoriesByType: function(typeOfTransaction){
        let cetegoriesForCurrentUser = serviceCategoryRefactored.getCategories().concat(serviceCategoryRefactored.getSharedCategories());
        return cetegoriesForCurrentUser.filter(element => {
            if(typeOfTransaction === element.type){
                return element;
            }
        });
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

    getSelectedCategory: function (type) {
        let selectedItem = [];
        if (type === "from") {
            selectedItem = this.view.lstTransactionFrom.selectedKeyValue;
        } else if (type === "to"){
            selectedItem = this.view.lstTransactionTo.selectedKeyValue;
        }
        let categories = serviceCategory.getCategories()
        .concat(serviceCategoryRefactored.getSharedCategories());
        let cuurentCategory = {};
        for(let i = 0; i < categories.length; i++) {
            if(selectedItem[1] === categories[i].name){
                cuurentCategory = categories[i];
            }
        }
        return cuurentCategory;
    },

    setDefaultDate: function () {
        let curDate = new Date(Date.now());
        let day = curDate.getDate();
        let month = curDate.getMonth() + 1;
        let year = curDate.getFullYear();
        this.view.calTransactionDate.dateComponents = [day, month, year];
    },


    hideErrorMasage: function (){
        this.view.flxErrorContainer.isVisible = "false";
    },

    exchange: function(){

        let from = this.view.lstTransactionFrom.selectedKeyValue[1];    
        let currencyFrom= serviceCategory.getCurrencyByCatName(from); 

        let to = this.view.lstTransactionTo.selectedKeyValue[1];  
        let currencyTo = serviceCategory.getCurrencyByCatName(to); 

        let ammount = parseFloat(this.view.txbTransactionAmount.text);
        let exchange = this.view.txtExchange.text;


        if( currencyFrom !== currencyTo ){
            this.view.flxExchange.isVisible = true;
            this.view.lblCurrency.text = currencyFrom;
            this.view.lblAnotherCurrency.text = currencyTo; 

        } else{
            this.view.flxExchange.isVisible = false;
            this.view.lblCurrency.text = '';
            this.view.lblAnotherCurrency.text = '';     
        }

        let result = calculate( currencyFrom, currencyTo, ammount);
        if(currencyFrom === currencyTo) {
            this.view.txtExchange.text = ammount;
        }else if( ammount ){   
            let fixResult = parseFloat(result.toFixed(2));
            this.view.txtExchange.text = fixResult; 

        } else {
            this.view.txtExchange.text = '';
        }
    } ,
    cleanFields: function(){
        this.view.txbTransactionAmount.text ="";
        this.view.txtExchange.text = "";
        this.view.flxExchange.isVisible = false;
        this.view.lblCurrency.text = "";
        this.view.lblAnotherCurrency.text = "";

    }






});     
