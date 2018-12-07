const CATEGORY_TYPES = {
    INCOME: 'Income',
    CURRENT: 'Current',
    EXPENSE: 'Expenses'
};

let DATE = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
};

const serviceTransactionsRefactored = {

    getByCategoryId: function(categoryId){
        let transaction = [];
        for(let i = 0; i < DATA.transactions.length; i++){
            if(categoryId === DATA.transactions[i].to || categoryId === DATA.transactions[i].from){
                transaction.push(DATA.transactions[i]);
            }
        }
        return transaction;
    },

    getById: function(transactionId){
        for(let i = 0; i < DATA.transactions.length; i++){
            if(transactionId === DATA.transactions[i].id){
                return DATA.transactions[i];
            }
        }
        return null;
    },

    getAll: function () {
        return DATA.transactions.filter((element) => {
            if (element.user_id === CURRENT_USER.id){
                return element;
            }
        });
    },

    getAllByType: function(categoryId, type, fromOrTo){
        let transactions = [];
        for(let i = 0; i < DATA.transactions.length; i++){
            if(DATA.transactions[i][type] === categoryId){
                transactions.push(DATA.transactions[i][fromOrTo]);
            }
        }
        return transactions;
    },

    getAllExternalIntoSharedForMeCategories: function () {
        let categoriesId = serviceCategoryRefactored.getSharedCategories().map(i => i.id);
        return DATA.transactions.filter(transaction => {
            if (~categoriesId.indexOf(transaction.to) && transaction.user_id !== CURRENT_USER.id){
                return transaction;
            }
        });
    },

    getAllExternalIntoMySharedCategories: function () {
        let categoriesId = serviceCategoryRefactored.getCategories().map(i => i.id);
        return DATA.transactions.filter(transaction => {
            if(~categoriesId.indexOf(transaction.to) && transaction.user_id !== CURRENT_USER.id){
                return transaction;
            }
        });
    },

    getAllExternalFromSharedCategories: function () {
        let categoriesId = serviceCategoryRefactored.getCategories().concat(serviceCategoryRefactored.getSharedCategories()).map(i => i.id);
        return DATA.transactions.filter(transaction => {
            if(~categoriesId.indexOf(transaction.from) && transaction.user_id !== CURRENT_USER.id){
                return transaction;
            }
        });
    },

    create: function(id, fromAmount, from, to, date, comment, toAmount){
        let transaction = {};
        transaction.id = id;
        transaction.from = from;
        transaction.fromAmount = parseFloat(fromAmount);
        transaction.to = to;
        transaction.user_id = CURRENT_USER.id;
        transaction.toAmount = parseFloat(toAmount);
        transaction.date = new Date(date);
        transaction.commentary = comment;

        DATA.transactions.push(transaction);
    },

    update: function(transactionId, from, fromAmount, to, toAmount, date, comment){
        let transaction = this.getById(transactionId);

        transaction.fromAmount = parseFloat(fromAmount) || transaction.fromAmount;
        transaction.toAmount = parseFloat(toAmount) || transaction.toAmount;
        transaction.from = from || transaction.from;
        transaction.to = to || transaction.to;
        transaction.date = new Date(date) || transaction.date;
        transaction.commentary = comment || transaction.commentary;

    },

    deleteById: function(transactionId){
        for(let i = 0; i < DATA.transactions.length; i++){
            if(transactionId === DATA.transactions[i].id){
                DATA.transactions.splice(i, 1);
            }
        }
    }
};

const serviceCategoryRefactored = {

    getBalanceByType: function(categoryId){
        let amount = CATEGORY_TYPES.INCOME === this.getById(categoryId).type ? 'fromAmount' : 'toAmount';
        let type = CATEGORY_TYPES.INCOME === this.getById(categoryId).type ? 'from' : 'to';
        let categoryBalance = 0.00;
        for(let i = 0; i < DATA.transactions.length; i++){
            if(DATA.transactions[i][type] === categoryId){
                categoryBalance += parseFloat(DATA.transactions[i][amount]);
            }
        }
        return parseFloat(categoryBalance.toFixed(2));
    },

    //Argument "allTransactions" only for calculate getCurrentBalance
    getIncomeBalance: function(allTransactions){
        let incomes = 0.00;
        let transactionsWithoutShare = serviceTransactionsRefactored.getAll();
        let transactionsWithshare = transactionsWithoutShare.concat(serviceTransactionsRefactored.getAllExternalIntoSharedForMeCategories());
        let transactions = allTransactions ? transactionsWithshare : transactionsWithoutShare;
        let defaultCurrency = userServiceRefactored.getById(CURRENT_USER.id).currency;
        for(let i = 0; i < transactions.length; i++){
            if(this.getById(transactions[i].from).type === CATEGORY_TYPES.INCOME){
                let categoryFrom = this.getCurrencyById(transactions[i].from);
                let categoryTo = this.getCurrencyById(transactions[i].to);
                if(defaultCurrency === categoryFrom){
                    incomes += parseFloat(transactions[i].fromAmount);
                }else if(defaultCurrency === categoryTo){
                    incomes += parseFloat(transactions[i].toAmount);
                }else{
                    incomes += calculate(categoryFrom, defaultCurrency, transactions[i].fromAmount);
                }
            }
        }
        return parseFloat(incomes.toFixed(2));
    },

    //If "allTransactions" = true then function will return balance with external transactions into shared categories
    getCurrentBalance: function(allTransactions){
        let current = this.getIncomeBalance(allTransactions) - this.getExpenseBalance();
        if(allTransactions){
            let externalTransations = serviceTransactionsRefactored.getAllExternalIntoMySharedCategories();
            let defaultCurrency = userServiceRefactored.getById(CURRENT_USER.id).currency;
            for(let i = 0; i < externalTransations.length; i++){
                if(this.getById(externalTransations[i].from).type === CATEGORY_TYPES.CURRENT &&
                   this.getById(externalTransations[i].to).type === CATEGORY_TYPES.CURRENT &&
                   this.getById(externalTransations[i].from).user_id !== CURRENT_USER.id)
                {
                    let categoryFrom = this.getCurrencyById(externalTransations[i].from);
                    let categoryTo = this.getCurrencyById(externalTransations[i].to);
                    if(defaultCurrency === categoryFrom){
                        current += parseFloat(externalTransations[i].fromAmount);
                    }else if(defaultCurrency === categoryTo){
                        current += parseFloat(externalTransations[i].toAmount);
                    }else{
                        current += calculate(categoryFrom, defaultCurrency, externalTransations[i].fromAmount);
                    }
                }
            }
            let externalTransactionsForm = serviceTransactionsRefactored.getAllExternalFromSharedCategories();
            externalTransactionsForm.forEach(i => {
                if(this.getById(i.to).user_id !== CURRENT_USER.id && 
                   !(~this.getById(i.to).sharedUsers_id.indexOf(CURRENT_USER.id))){
                    current -= i.fromAmount;
                }
            });
        }
        return parseFloat(current.toFixed(2));
    },

    //If "allTransactions" = true then function will return balance with external transactions into shared categories
    getExpenseBalance: function(allTransactions){
        let expense = 0.00;
        let transactionsWithoutShare = serviceTransactionsRefactored.getAll();
        let transactionsWithshare = transactionsWithoutShare.concat(serviceTransactionsRefactored.getAllExternalIntoSharedForMeCategories(), 
                                                                    serviceTransactionsRefactored.getAllExternalIntoMySharedCategories());
        let transactions = allTransactions ? transactionsWithshare : transactionsWithoutShare;
        let defaultCurrency = userServiceRefactored.getById(CURRENT_USER.id).currency;
        for(let i = 0; i < transactions.length; i++){
            if(this.getById(transactions[i].to).type === CATEGORY_TYPES.EXPENSE){
                let categoryFrom = this.getCurrencyById(transactions[i].from);
                let categoryTo = this.getCurrencyById(transactions[i].to);
                if(defaultCurrency === categoryTo){
                    expense += parseFloat(transactions[i].toAmount);
                }else if(defaultCurrency === categoryFrom){
                    expense += parseFloat(transactions[i].fromAmount);
                }else{
                    expense += calculate(categoryTo, defaultCurrency, transactions[i].fromAmount);
                }
            }
        }
        return parseFloat(expense.toFixed(2));
    },

    getById: categoryId => {
        return DATA.categories.find(category => category.id === categoryId);
    },

    getCategories: function() {
        let categories = [];
        for(let i = 0; i < DATA.categories.length; i++) {
            if(DATA.categories[i].user_id === CURRENT_USER.id) {
                categories.push(DATA.categories[i]);
            }
        }
        return categories;
    },

    getWithSharedCategories: function() {
        let categories = [];
        for(let i = 0; i < DATA.categories.length; i++) {
            if(DATA.categories[i].user_id === CURRENT_USER.id || DATA.categories[i].sharedUsers_id.indexOf(CURRENT_USER.id) !== -1) {
                categories.push(DATA.categories[i]);
            }
        }
        return categories;
    },

    getCurrencyById: function(categoryId) {
        return this.getById(categoryId).currency;
    },

    getCurrencyByCatName: function(categoryName) {
        let element = DATA.categories.find(category => category.name === categoryName);
        return element.currency;
    },

    create: function(data) {
        DATA.categories.push(data);
        return DATA.categories;
    },

    updateById: function(id, data) {
        const element = DATA.categories.find(category => category.id === id);
        Object.keys(data).map(key => {
            if(element.hasOwnProperty(key)) {
                element[key] = data[key];
            }
        });
        return element;
    },

    shareCategory: function (categotyId, userId) {
        this.getById(categotyId).sharedUsers_id.push(userId);
    },

    deleteByUserId: function(userId) {
        for(let i = 0; i < DATA.categories.length; i++) {
            if(DATA.categories[i].user_id === userId) {
                DATA.categories.splice([i], 1);
                i--;
            }
        }
        return DATA.categories;
    },

    deleteById: function(id) {
        const index = DATA.categories.findIndex(category => category.id === id);
        if(index !== -1) {
            DATA.categories.splice(index, 1);
        }
        return DATA.categories;
    },

    getSharedCategories: function () {
        let categories = DATA.categories.filter((category) => {
            if (~category.sharedUsers_id.indexOf(CURRENT_USER.id)){
                return category;
            }
        });
        return categories;
    }
};

const userServiceRefactored = {

    getById: function (userId) {
        let userMockArray = DATA.users.filter(function (user) {
            return user.id === userId;
        });

        if (userMockArray && userMockArray.length) {
            return userMockArray[0];
        }
        return null;
    },

    getByEmail: function (email) {
        let userMockArray = DATA.users.filter(function (user) {
            return user.email === email;
        });

        if (userMockArray && userMockArray.length) {
            return userMockArray[0];
        }
        return null;
    },

    updateUser: function (firstName, lastName, password, currency, image) {
        let user = this.getById(CURRENT_USER.id);

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.password = password || user.password;
        user.currency = currency || user.currency;
        user.image = image || user.image;

    },

    login: function (email, password) {
        let validateEmailResult = validateEmail(email);

        if(!validateEmailResult){
            return {
                error: {
                    message: 'Invalid Email',
                    type: 'email'
                }
            };
        }

        let validatePasswordResult = validatePassword(password);

        if(!validatePasswordResult){
            return {
                error: {
                    message: 'Invalid password',
                    type: 'password'
                }
            };
        }

        var user = DATA.users.filter(function (user) {
            return user.email === email;
        })[0];

        if ( user ) {
            if ( user.password === password ){
                CURRENT_USER.id = user.id;
                return {
                    user: user,
                    error: null,
                };
            }
        }
        return {
            error: {
                message: 'User is not found',
                type: 'email'
            },
        };
    },

    registration: function(email, password, confPassword) {
        let user = {};

        let validateEmailResult = validateEmail(email);
        if(!validateEmailResult){
            return {
                error: {
                    message: 'Invalid Email',
                    type: 'email'
                }
            };
        }

        let validatePasswordResult = validatePassword(password);
        if(!validatePasswordResult){
            return {
                error: {
                    message: 'The password must include uppercase \n and lowercase letters numbers and symbols',
                    type: 'password'
                }
            };
        }

        let userMockArray = DATA.users.filter(function(user) {
            return user.email === email;
        });
        if ( userMockArray.length ){
            return {
                error: {
                    message: 'User with this email address already exists',
                    type: 'email'

                }
            };
        }

        if(password != confPassword){
            return {
                error: {
                    message: 'The password confirmation is not the same \n as the password entered',
                    type: 'passwordConfirmation'
                }
            };

        }

        user.email = email;
        user.password = password;
        user.id = Date.now();
        user.firstName = "";
        user.lastName = "";
        user.currency = "UAH";
        user.image = "";
        DATA.users.push(user);
        return user.id;
    }
};

const serviceCurrenciesRefactored = {
    findUserCurrencies: function (){
        let categories = serviceCategory.getCategories();
        let curr = [];
        for(let i = 0; i < categories.length; i++){
            const index = curr.findIndex(elem => elem === categories[i].currency);
            if(index === -1) {
                curr.push(categories[i].currency);
            }
        }
        return curr;
    },

    generateCurrencySubsets: function(currencies){
        let results = [];
        for(let i = 0; i < currencies.length; i++){
            let currenciesCopy = currencies.slice();
            let index = currenciesCopy.indexOf(currencies[i]);
            currenciesCopy.splice(index, 1);
            for(let j = 0; j < currenciesCopy.length; j++){
                results.push(currencies[i]+"_"+currenciesCopy[j]);
            }
        }
        return results;
    },

    getCurrencies: function(currencySubsets){
        currencySubsets.forEach(pairs => {
            let requestURL = 'http://free.currencyconverterapi.com/api/v6/convert?q=' + pairs + '&compact=y';
            let xhr = new kony.net.HttpRequest();
            xhr.open(constants.HTTP_METHOD_GET, requestURL);
            xhr.onReadyStateChange = function(){
                try
                {
                    if(xhr.readyState == 4)
                    {
                        let exchangeSet = xhr.response;
                        for(let currencyPair in exchangeSet){
                            for(let exchangeRate in exchangeSet[currencyPair]){
                                EXCHANGELIST[currencyPair] = exchangeSet[currencyPair][exchangeRate];
                            }
                        }
                    }
                }
                catch(err)
                {
                    alert("exception is :: " + err);
                }

            };
            xhr.send();
        });

    }
};