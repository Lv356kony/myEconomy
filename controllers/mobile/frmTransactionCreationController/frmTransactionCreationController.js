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
        let amount = this.view.txbTransactionAmount.text;
        let from = this.getSelectedCategory("from").id;
        let to = this.getSelectedCategory("to").id;
        let userId = CURRENT_USER.id;
        let date = this.view.calTransactionDate.formattedDate;
        let comment = this.view.txbTransactionComentarry.text;
        if (amount) {
            serviceTransactions.create(id, amount, from, to, userId, date, comment);
            navToForm("frmCategoriesList");
            this.view.txbTransactionAmount.text = "";
            this.view.txbTransactionComentarry.text = "";
        } else {
            this.view.flxErrorContainer.isVisible = "true";
        }
    },


    getDataForListBox: function (categoryType) {
        let category = serviceCategory.getCategories();
        let dataForFrom = category
        .filter((obj) => {
            if (obj.type === categoryType) {
                return obj;
            }
        })
        .map((obj, i) => {
            return[i, obj.name];
        });
        return dataForFrom;
    },


    setListBoxData: function () {
        let category = serviceCategory.getCategories();
        let listBoxFrom = this.view.lstTransactionFrom;
        let listBoxTo = this.view.lstTransactionTo;
        let dataFrom = [];
        let dataTo = [];
        if (this.category === "Expenses") {
            dataFrom = this.getDataForListBox("Current");
            dataTo = this.getDataForListBox("Expenses");
        } else {
            dataFrom = this.getDataForListBox("Income");
            dataTo = this.getDataForListBox("Current");
        }
        listBoxFrom.masterData = dataFrom;
        listBoxFrom.selectedKey = dataFrom[0][0];
        listBoxTo.masterData = dataTo;
        listBoxTo.selectedKey = dataTo[0][0];
    },


    getSelectedCategory: function (type) {
        let selectedItem = [];
        if (type === "from") {
            selectedItem = this.view.lstTransactionFrom.selectedKeyValue;
        } else if (type === "to"){
            selectedItem = this.view.lstTransactionTo.selectedKeyValue;
        }
        let categories = serviceCategory.getCategories();
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
    }


});