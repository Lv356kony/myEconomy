function navToForm(formName, data){
    let target = new kony.mvc.Navigation(formName);
    if(data){
        target.navigate(data);
    } else{
        target.navigate();
    }
}

var getMonth = {'0': 'January', '1': 'February', '2': 'March', '3': 'April', '4': 'May',
                '5': 'June', '6': 'July', '7': 'August', '8': 'September',
                '9': 'October', '10': 'November', '11': 'December'};
var getDay = {'0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday',
              '4': 'Thursday', '5': 'Friday', '6': 'Saturday'};
let categoryAnimProps = {getAnimationStatus: true, timerIdMemory: ''};

//When creating transaction we need to set current user as default user_id
const CURRENT_USER = {id: undefined};

const EXCHANGELIST = {UAH_USD: 0.035473,
USD_UAH: 28.190367};

const CURRENCIES = ["UAH", "USD", "EUR", "PLN"];

const DATA = {
    users:[],
    categories:[],
    transactions:[]
};

const serviceTransactions = {

    getBalanceByCategoryId: function(categoryId){
        let categoryBalance = 0.00;
        for(let i = 0; i < DATA.transactions.length; i++){
            if(DATA.transactions[i].to === categoryId){
                categoryBalance += parseFloat(DATA.transactions[i].toAmount);
            }
        }
        return parseFloat(categoryBalance.toFixed(2));
    },

    getIncomeBalanceByCategoryId: function(categoryId){
        let categoryBalance = 0;
        for(let i = 0; i < DATA.transactions.length; i++){
            if(DATA.transactions[i].from === categoryId){
                categoryBalance += parseFloat(DATA.transactions[i].fromAmount);
            }
        }
        return parseFloat(categoryBalance.toFixed(2));
    },

    getCurrentBalanceByUserId: function(){
        let categories = [];
        for(let i = 0; i < DATA.categories.length; i++){
            if(CURRENT_USER.id === DATA.categories[i].user_id){
                categories.push(DATA.categories[i]);
            }
        }

        let expensesIds = [];
        let incomeIds = [];
        for(let i = 0; i < categories.length; i++){
            if(categories[i].type === 'Expenses'){
                expensesIds.push(categories[i].id);
            }
            else if(categories[i].type === 'Income'){
                incomeIds.push(categories[i].id);
            }
        }

        let countExpenses = 0.00;
        let countIncome = 0.00;
        for(let i = 0; i < DATA.transactions.length; i++){
            for(let j = 0; j < expensesIds.length; j++){
                if(DATA.transactions[i].to === expensesIds[j]){
                    countExpenses += parseInt(DATA.transactions[i].toAmount);
                }
            }
        }

        for(let i = 0; i < DATA.transactions.length; i++){
            for(let j = 0; j < incomeIds.length; j++){
                if(DATA.transactions[i].from === incomeIds[j]){
                    countIncome += parseInt(DATA.transactions[i].toAmount);
                }
            }
        }

        return countIncome - countExpenses;
    },

    getByCategoryId: function(categoryId){
        let transaction =[];
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

    getTransactionForCurrentUser: function () {
        return DATA.transactions.filter((element, i) => {
            if (DATA.transactions[i].user_id === CURRENT_USER.id){
                return DATA.transactions[i];
            }
        });
    },

    create: function(id, fromAmount, from, to, userId, date, comment, toAmount){
        let transaction = {};
        transaction.id = parseInt(id);
        transaction.from = parseInt(from);
        transaction.fromAmount = parseFloat(fromAmount);
        transaction.to = parseInt(to);
        transaction.user_id = parseInt(userId);
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

const serviceCategory = {
    deleteById: function(id) {
        const index = DATA.categories.findIndex(category => category.id === id);
        if(index !== -1) {
            DATA.categories.splice(index, 1);
        }
        return DATA.categories;
    },

    getById: categoryId => {
        return DATA.categories.find(category => category.id === categoryId);
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

    shareCategory: function (categotyId, userId) {
        this.getById(categotyId).sharedUsers_id.push(userId);
    }
};

const userService = {
    getById: function (userId) {
        let userMockArray = DATA.users.filter(function (user) {
            return user.id === userId;
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

const serviceCurrencies = {
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

function initCurrencies(){
    let currencySubsets = serviceCurrencies.generateCurrencySubsets(serviceCurrencies.findUserCurrencies());
    serviceCurrencies.getCurrencies(currencySubsets);
}

function validateEmail(str) {
    let pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
}

function validatePassword(string){
    let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,16})/;
    return strongRegex.test(string);
}

function calculate(from, to, value) {
    let key = from + "_" + to;
    return parseFloat((value*EXCHANGELIST[key]).toFixed(2));
}