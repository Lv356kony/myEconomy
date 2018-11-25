define({ 
    goToCategories: function(){
        alert(EXCHANGELIST);
        navToForm("frmCategoriesList");
    },

    goToHistoryDetails: function(){  
        let currents = this.filterByTypeOfTransaction("Current");
        if(currents.indexOf(this.categoryId) !== -1){
            return;
        }
        let transDetails = this.view.segHistoryExpense.selectedRowItems;
        navToForm("frmHistoryDetails", {categoryId: this.categoryId,
                                        date: `${transDetails[0].numDay} ${transDetails[0].date}`});
    },

    onNavigate: function(category) 
    {
        this.categoryId = category.categoryId;
    },

    showCategory: function(){
        let category = serviceCategory.getById(this.categoryId);
        this.view.txtHistoryCategory.text = category.name;
        this.view.imgHistoryCategory.src = category.icon;
    },


    showExpenses: function() {
        let incomes = this.filterByTypeOfTransaction("Income");
        let currents = this.filterByTypeOfTransaction("Current");
        let expByCat = '';

        if(incomes.indexOf(this.categoryId) !== -1){
            expByCat = this.getByCategoryIdFrom(this.categoryId);
        }else if(currents.indexOf(this.categoryId) !== -1){
            this.showCurrent();
            return;
        }else{
            expByCat = serviceTransactions.getByCategoryId(this.categoryId);
        }

        expByCat = this.sortTransactions(expByCat);
        let dates = []; 

        for(let i = 0; i < expByCat.length; i++){
            let day = getDay[expByCat[i].date.getDay()];
            let numDay = expByCat[i].date.getDate().toString();
            let date = getMonth[expByCat[i].date.getMonth()] + ' ' + expByCat[i].date.getFullYear();
            let imgSum = 'sum.png';
            let imgDol = 'dollar_symbol.png';

            let outerDateKey = expByCat[i].date.getDate() + ' ' + expByCat[i].date.getMonth(); 

            let filtExpByDay = expByCat.filter(value => {
                let innerDateKey = value.date.getDate() + ' ' + value.date.getMonth();
                return outerDateKey == innerDateKey;
            });

            const index = dates.findIndex(daySum => daySum.numDay === numDay && daySum.date === date);
            if(index === -1){
                let amounts = [];
                for(let j = 0; j < filtExpByDay.length; j++){
                    amounts.push(filtExpByDay[j].amount);
                }
                let sum = amounts.reduce((prev,curr) => prev + curr); 
                dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(), imgSum: imgSum, imgDol: imgDol});
            }

        }

        let segHistoryExpense = this.view.segHistoryExpense;
        segHistoryExpense.widgetDataMap = {
            numDay: 'numDay',
            txtDay: 'day',
            txtDate: 'date',
            txtResult: 'sum',
            imgSummary: 'imgSum',
            imgDollar: 'imgDol'
        };
        segHistoryExpense.setData(dates);
    },

    sortTransactions: function(transactions){
        let sortedTransactions = transactions.sort(function(a, b){
            return b.date.getTime() - a.date.getTime();
        });
        return sortedTransactions;
    },

    filterByTypeOfTransaction: function(typeOfTransaction){
        let categories = [];
        for(let i = 0; i < DATA.categories.length; i++){
            if(typeOfTransaction === DATA.categories[i].type){
                categories.push(DATA.categories[i].id);
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

    getBalanceByCard: function(){
        let expByCat = serviceTransactions.getByCategoryId(this.categoryId);
        let transactions = [0];
        for(let i = 0; i < DATA.transactions.length; i++){
            if(DATA.transactions[i].from === this.categoryId){
                transactions.push(DATA.transactions[i].amount);
            }
        }

        let incomes = [0];
        for(let j = 0; j < DATA.transactions.length; j++){
            if(DATA.transactions[j].to === this.categoryId){
                incomes.push(DATA.transactions[j].amount);
            }
        }
        let result = incomes.reduce((prev, curr) => prev + curr) - transactions.reduce((prev, curr) => prev + curr);
        return result.toFixed(2);
    },

    showCurrent: function(){
        let now = new Date();
        let currents = this.filterByTypeOfTransaction("Current");

        let dates = []; 

        let day = getDay[now.getDay()];
        let numDay = now.getDate().toString();
        let date = getMonth[now.getMonth()] + ' ' + now.getFullYear();
        let imgSum = 'sum.png';
        let imgDol = 'dollar_symbol.png';
        let sum = this.getBalanceByCard();

        dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(), imgSum: imgSum, imgDol: imgDol});

        let segHistoryExpense = this.view.segHistoryExpense;
        segHistoryExpense.widgetDataMap = {
            numDay: 'numDay',
            txtDay: 'day',
            txtDate: 'date',
            txtResult: 'sum',
            imgSummary: 'imgSum',
            imgDollar: 'imgDol'
        };
        segHistoryExpense.setData(dates);
    },

    deleteWithTransactions: function(){
        serviceCategory.deleteById(this.categoryId);
        for(let i = 0; i < DATA.transactions.length; i++){
            if(this.categoryId === DATA.transactions[i].from || this.categoryId === DATA.transactions[i].to){
                DATA.transactions.splice(i, 1);
                i--;
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
        this.view.flxDeleteCategoryContainer.setVisibility(true);	
        this.view.flxDeletionOptions.setVisibility(true);
        this.view.flxDeleteConfirmation.setVisibility(false);
    },

    hideDeleteOptions: function(){
        this.view.flxDeleteCategoryContainer.setVisibility(false);
        this.view.flxDeletionOptions.setVisibility(false);
        this.view.flxDeleteConfirmation.setVisibility(false);          
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
    }
});