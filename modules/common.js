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

const CURRENT_USER = {id: undefined};

const EXCHANGELIST = {};

const CURRENCIES = ["UAH", "USD", "EUR", "PLN"];

const DATA = {
    users: [
        {
            id: 1,
            email: 'antti.raatali@gmail.com',
            password: 'Ra$1',
            firstName: "",
            lastName: "",
            currency: "UAH",
            image: ""

        },  {
            id: 2,
            email: 'taras.hlukhovetskyi@gmail.com',
            password: 'intelwithradeon',
            firstName: "",
            lastName: "",
            currency: "UAH",
            image: ""
        },  {
            id: 3,
            email: 'o.piaskovska@gmail.com',
            password: 'somepassword',
            firstName: "",
            lastName: "",
            currency: "UAH",
            image: ""
        },  {
            id: 4,
            email: 'nakonechna.katja@gmail.com',
            password: 'Ra$1',
            firstName: "",
            lastName: "",
            currency: "UAH",
            image: ""
        },  {
            id: 5,
            email: 'olesiadovbush98@gmail.com',
            password: 'onemoretime',
            firstName: "",
            lastName: "",
            currency: "UAH",
            image: ""
        }
    ],

    categories: [
        {
            id: 1,
            icon: 'bill.png',
            name: 'Groceries',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 2,
            icon: 'home.png',
            name: 'Home',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 3,
            icon: 'car.png',
            name: 'Transport',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 4,
            icon: 'cocktail.png',
            name: 'Cafe',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 5,
            icon: 'gamecontroller.png',
            name: 'Games',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 6,
            icon: 'dollar.png',
            name: 'Salary',
            type: 'Income',
            user_id: 1
        },  {
            id: 7,
            icon: 'bank.png',
            name: 'Monobank',
            type: 'Current',
            user_id: 1
        }
    ],
    
    transactions: [
        {
            id: 1,
            from: 7,
            fromAmount: 152.1,
            to: 4,
            toAmount: 152.1,
            user_id: 1,
            date: new Date('August 19, 2018 23:15:30'),
            commentary: 'Вечеря'
        }, {
            id: 2,
            from: 7,
            fromAmount: 5,
            to: 3,
            toAmount: 5,
            user_id: 1,
            date: new Date('August 19, 2018 23:15:30'),
            commentary: 'Маршрутка'
        },  {
            id: 3,
            from: 7,
            fromAmount: 67,
            to: 1,
            toAmount: 67,
            user_id: 1,
            date: new Date('August 18, 2018 23:15:30'),
            commentary: 'Продукти'
        },  {
            id: 4,
            from: 7,
            fromAmount: 11.1,
            to: 1,
            toAmount: 11.1,
            user_id: 1,
            date: new Date('August 17, 2018 23:15:30'),
            commentary: 'Морозиво'
        },  {
            id: 5,
            from: 7,
            fromAmount: 85,
            to: 2,
            toAmount: 85,
            user_id: 1,
            date: new Date('August 17, 2018 23:15:30'),
            commentary: 'Інтернет'
        },  {
            id: 6,
            from: 7,
            fromAmount: 80.21,
            to: 3,
            toAmount: 80.21,
            user_id: 1,
            date: new Date('August 17, 2018 23:15:30'),
            commentary: 'Таксі'
        },  {
            id: 7,
            from: 7,
            fromAmount: 329,
            to: 1,
            toAmount: 329,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Віскарь'
        },  {
            id: 8,
            from: 7,
            fromAmount: 189,
            to: 1,
            toAmount: 189,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Продукти'
        },  {
            id: 9,
            from: 7,
            fromAmount: 11670,
            to: 5,
            toAmount: 417,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Playstation 4'
        },  {
            id: 10,
            from: 7,
            fromAmount: 46,
            to: 1,
            toAmount: 46,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Абсент'
        },  {
            id: 11,
            from: 7,
            fromAmount: 23,
            to: 2,
            toAmount: 23,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: ''
        },  {
            id: 12,
            from: 6,
            fromAmount: 1000,
            to: 7,
            toAmount: 28200,
            user_id: 1,
            date: new Date('August 15, 2018 23:15:30'),
            commentary: 'Зарплата'
        },  {
            id: 13,
            from: 6,
            fromAmount: 1100,
            to: 7,
            toAmount: 30800,
            user_id: 1,
            date: new Date('August 15, 2018 23:15:30'),
            commentary: 'Зарплата'
        }, {
            id: 14,
            from: 7,
            fromAmount: 38.25,
            to: 4,
            toAmount: 38.25,
            user_id: 1,
            date: new Date('August 14, 2018 23:15:30'),
            commentary: 'Білий Лев'
        }, {
            id: 15,
            from: 7,
            fromAmount: 5,
            to: 3,
            toAmount: 5,
            user_id: 1,
            date: new Date('August 14, 2018 23:15:30'),
            commentary: 'Тролейбус'
        },  {
            id: 16,
            from: 7,
            fromAmount: 95,
            to: 1,
            toAmount: 95,
            user_id: 1,
            date: new Date('August 14, 2018 23:15:30'),
            commentary: 'Продукти'
        },  {
            id: 17,
            from: 7,
            fromAmount: 16.59,
            to: 1,
            toAmount: 16.59,
            user_id: 1,
            date: new Date('August 13, 2018 23:15:30'),
            commentary: 'Халва'
        },  {
            id: 18,
            from: 7,
            fromAmount: 105,
            to: 2,
            toAmount: 105,
            user_id: 1,
            date: new Date('August 13, 2018 23:15:30'),
            commentary: 'Мобільний звязок'
        },  {
            id: 19,
            from: 7,
            fromAmount: 60,
            to: 3,
            toAmount: 60,
            user_id: 1,
            date: new Date('August 12, 2018 23:15:30'),
            commentary: 'Таксі'
        },  {
            id: 20,
            from: 7,
            fromAmount: 129,
            to: 1,
            toAmount: 129,
            user_id: 1,
            date: new Date('August 12, 2018 23:15:30'),
            commentary: 'Рукавичка'
        },  {
            id: 21,
            from: 7,
            fromAmount: 74,
            to: 1,
            toAmount: 74,
            user_id: 1,
            date: new Date('August 12, 2018 23:15:30'),
            commentary: 'Продукти'
        },  {
            id: 22,
            from: 7,
            fromAmount: 1699,
            to: 5,
            toAmount: 61,
            user_id: 1,
            date: new Date('August 12, 2018 23:15:30'),
            commentary: 'Red Dead Redemption 2'
        },  {
            id: 23,
            from: 7,
            fromAmount: 53,
            to: 1,
            toAmount: 53,
            user_id: 1,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Пиво'
        },  {
            id: 24,
            from: 7,
            fromAmount: 1990,
            to: 2,
            toAmount: 1990,
            user_id: 1,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Стіл'
        },  {
            id: 25,
            from: 7,
            fromAmount: 4200,
            to: 2,
            toAmount: 4200,
            user_id: 1,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Стільці'
        },  {
            id: 26,
            from: 7,
            fromAmount: 1207,
            to: 2,
            toAmount: 1207,
            user_id: 1,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Килим'
        },    {
            id: 27,
            from: 7,
            fromAmount: 5,
            to: 3,
            toAmount: 5,
            user_id: 1,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Метро'
        }
    ]
};

const serviceTransactions = {

    getBalanceByCategoryId: function(categoryId){
        let categoryBalance = 0.00;
        for(let i = 0; i < DATA.transactions.length; i++){
            if(DATA.transactions[i].to === categoryId){
                categoryBalance += parseInt(DATA.transactions[i].toAmount);
            }
        }
        return categoryBalance;
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

    create: function(id, fromAmount, from, to, userId, date, comment, toAmount){
        let transaction = {};
        transaction.id = parseInt(id);
        transaction.from = parseInt(from);
        transaction.fromAmount = parseFloat(fromAmount);
        transaction.to = parseInt(to);
        transaction.toAmount = parseFloat(toAmount);
        transaction.userId = parseInt(userId);
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
      let requestURL = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + pairs + '&compact=y';
      let xhr = new XMLHttpRequest();
      xhr.open('GET', requestURL);
      xhr.onload = function(){
        if (xhr.status != 200) {
          alert( xhr.status + ': ' + xhr.statusText );
        } else {
          let exchangeSet = JSON.parse(xhr.responseText);
          for(let currencyPair in exchangeSet){
            for(let exchangeRate in exchangeSet[currencyPair]){
              EXCHANGELIST[currencyPair] = exchangeSet[currencyPair][exchangeRate];
            }
          }
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
