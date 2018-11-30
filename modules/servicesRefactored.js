const CATEGORY_TYPES = {
    INCOME: 'Income',
    CURRENT: 'Current',
    EXPENSE: 'Expenses'
};

const serviceTransactionsRefactored = {

    getByCategoryId: function(categoryId){
        let transaction = [];
        for(let i = 0; i < DATA.transactions.length; i++){
            if(categoryId === DATA.transactions[i].to){
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
        return DATA.transactions.filter((element, i) => {
            if (DATA.transactions[i].user_id === CURRENT_USER.id){
                return DATA.transactions[i];
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

    getIncomeBalance: function(){
        let incomes = 0.00;
        let transactions = serviceTransactionsRefactored.getAll();
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

    getCurrentBalance: function(){
        return this.getIncomeBalance() - this.getExpenseBalance();
    },

    getExpenseBalance: function(){
        let expense = 0.00;
        let transactions = serviceTransactionsRefactored.getAll();
        let defaultCurrency = userServiceRefactored.getById(CURRENT_USER.id).currency;
        for(let i = 0; i < transactions.length; i++){
            if(serviceCategoryRefactored.getById(transactions[i].to).type === CATEGORY_TYPES.EXPENSE){
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
    
    shareCategory: function (categotyId, userId) {
        this.getById(categotyId).sharedUsers_id.push(userId);
    },
    
    getSharedCategories: function () {
        let sharedCategories = [];
        let categories = DATA.categories.filter((category) => {
            if (~category.sharedUsers_id.indexOf(CURRENT_USER.id)){
                return category;
            }
        });
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
        return true;
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