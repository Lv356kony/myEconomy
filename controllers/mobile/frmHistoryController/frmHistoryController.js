define({ 
    goToCategories: function(){
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
    
    onPreShow: function() {
        let incomes = this.filterByTypeOfTransaction("Income");
        let currents = this.filterByTypeOfTransaction("Current");
        let expByCat = '';
		
        if(incomes.indexOf(this.categoryId) !== -1){
            expByCat = this.getByCategoryIdFrom(this.categoryId);
        }else if(currents.indexOf(this.categoryId) !== -1){
            this.showCurrent();
            this.view.fldHistorySearch.text = '';
            return;
        }else{
            expByCat = serviceTransactions.getByCategoryId(this.categoryId);
        }
        this.showExpenses(expByCat);
        this.view.fldHistorySearch.text = '';
    },


    showExpenses: function(data) {
        let expByCat = this.sortTransactions(data);
        let dates = []; 
        let fldHistorySearch = this.view.fldHistorySearch.text;
        this.view.btnHistorySearch.text = 'Search';

        for(let i = 0; i < expByCat.length; i++){
            let day = getDay[expByCat[i].date.getDay()];
            let numDay = expByCat[i].date.getDate().toString();
            let date = getMonth[expByCat[i].date.getMonth()] + ' ' + expByCat[i].date.getFullYear();
            let imgSum = 'sum.png';
            let imgDol = this.setCurrencyIcon(this.categoryId);

            let outerDateKey = expByCat[i].date.getDate() + ' ' + expByCat[i].date.getMonth(); 

            let filtExpByDay = expByCat.filter(value => {
                let innerDateKey = value.date.getDate() + ' ' + value.date.getMonth();
                return outerDateKey == innerDateKey;
            });
			
            const index = dates.findIndex(daySum => daySum.numDay === numDay && daySum.date === date);
            
            if(index === -1){
                let amounts = [];
                if(serviceCategory.getById(this.categoryId).type === 'Income'){
                    for(let j = 0; j < filtExpByDay.length; j++){
                        amounts.push(filtExpByDay[j].fromAmount);
                    }
                } else {
                    for(let j = 0; j < filtExpByDay.length; j++){
                        amounts.push(filtExpByDay[j].toAmount);
                    }
                }
                let sum = amounts.reduce((prev,curr) => prev + curr); 
                if(fldHistorySearch) {
                    let searchString = `${day} ${numDay} ${date} ${sum}`.toLowerCase();
                    let searchIndex = searchString.indexOf(fldHistorySearch);
                    if(searchIndex !== -1) {
                        dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(), imgSum: imgSum, imgDol: imgDol});
                        this.view.btnHistorySearch.text = 'Reset';
                    }
                } else {
                    dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(), imgSum: imgSum, imgDol: imgDol});
                }
            }
        }
        if(dates.length === 0) {
            alert('No matches. Try ro find something different.');
            this.view.btnHistorySearch.text = 'Reset';
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
        let transaction = [];
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
                transactions.push(DATA.transactions[i].fromAmount);
            }
        }

        let incomes = [0];
        for(let j = 0; j < DATA.transactions.length; j++){
            if(DATA.transactions[j].to === this.categoryId){
                incomes.push(DATA.transactions[j].toAmount);
            }
        }
        let result = incomes.reduce((prev, curr) => prev + curr) - transactions.reduce((prev, curr) => prev + curr);
        return result.toFixed(2);
    },

    showCurrent: function(){
        let now = new Date();
        let currents = this.filterByTypeOfTransaction("Current");
        let fldHistorySearch = this.view.fldHistorySearch.text;
        this.view.btnHistorySearch.text = 'Search';

        let dates = []; 

        let day = getDay[now.getDay()];
        let numDay = now.getDate().toString();
        let date = getMonth[now.getMonth()] + ' ' + now.getFullYear();
        let imgSum = 'sum.png';
        let imgDol = this.setCurrencyIcon(this.categoryId);
        let sum = this.getBalanceByCard();
        
        if(fldHistorySearch) {
            let searchString = `${day} ${numDay} ${date} ${sum}`.toLowerCase();
            let searchIndex = searchString.indexOf(fldHistorySearch);
            if(searchIndex !== -1) {
                dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(), imgSum: imgSum, imgDol: imgDol});
                this.view.btnHistorySearch.text = 'Reset';
            }
        } else {
            dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString(), imgSum: imgSum, imgDol: imgDol});
        }
        
		if(dates.length === 0) {
            alert('No matches. Try ro find something different.');
            this.view.btnHistorySearch.text = 'Reset';
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
    }
});