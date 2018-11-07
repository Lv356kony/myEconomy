function navToForm(formName){
    let target = new kony.mvc.Navigation(formName);
    target.navigate();
}

const CURRENT_USER = {id: undefined};

const DATA = {
    users: [
        {
            id: 1,
            email: 'antti.raatali@gmail.com',
            password: 'notthistime'
        },  {
            id: 2,
            email: 'taras.hlukhovetskyi@gmail.com',
            password: 'intelwithradeon'
        },  {
            id: 3,
            email: 'o.piaskovska@gmail.com',
            password: 'somepassword'
        },  {
            id: 4,
            email: 'nakonechna.katja@gmail.com',
            password: 'anotheronepassword'
        },  {
            id: 5,
            email: 'olesiadovbush98@gmail.com',
            password: 'onemoretime'
        }
    ],

    categories: [
        {
            id: 1,
            icon: 'groceriesIcon.png',
            name: 'Groceries',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 2,
            icon: 'homeIcon.png',
            name: 'Home',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 3,
            icon: 'transportIcon.png',
            name: 'Transport',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 4,
            icon: 'cafeIcon.png',
            name: 'Cafe',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 5,
            icon: 'gamesIcon.png',
            name: 'Games',
            type: 'Expenses',
            user_id: 1
        },  {
            id: 6,
            icon: 'salaryIcon.png',
            name: 'Salary',
            type: 'Income',
            user_id: 1
        },  {
            id: 7,
            icon: 'monobankIcon.png',
            name: 'Monobank',
            type: 'Current',
            user_id: 1
        }
    ],

    transactions: [
        {
            id: 1,
            amount: 152.1,
            from: 7,
            to: 4,
            user_id: 1,
            date: new Date('August 19, 2018 23:15:30'),
            commentary: 'Вечеря'
        }, {
            id: 2,
            amount: 5,
            from: 7,
            to: 3,
            user_id: 1,
            date: new Date('August 19, 2018 23:15:30'),
            commentary: 'Маршрутка'
        },  {
            id: 3,
            amount: 67,
            from: 7,
            to: 1,
            user_id: 1,
            date: new Date('August 18, 2018 23:15:30'),
            commentary: 'Продукти'
        },  {
            id: 4,
            amount: 11.1,
            from: 7,
            to: 1,
            user_id: 1,
            date: new Date('August 17, 2018 23:15:30'),
            commentary: 'Морозиво'
        },  {
            id: 5,
            amount: 85,
            from: 7,
            to: 2,
            user_id: 1,
            date: new Date('August 17, 2018 23:15:30'),
            commentary: 'Інтернет'
        },  {
            id: 6,
            amount: 80.21,
            from: 7,
            to: 3,
            user_id: 1,
            date: new Date('August 17, 2018 23:15:30'),
            commentary: 'Таксі'
        },  {
            id: 7,
            amount: 329,
            from: 7,
            to: 1,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Віскарь'
        },  {
            id: 8,
            amount: 189,
            from: 7,
            to: 1,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Пробукти'
        },  {
            id: 9,
            amount: 11670,
            from: 7,
            to: 5,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Playstation 4'
        },  {
            id: 10,
            amount: 46,
            from: 7,
            to: 1,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: 'Абсент'
        },  {
            id: 11,
            amount: 23,
            from: 7,
            to: 2,
            user_id: 1,
            date: new Date('August 16, 2018 23:15:30'),
            commentary: ''
        },  {
            id: 12,
            amount: 28200,
            from: 6,
            to: 7,
            user_id: 1,
            date: new Date('August 15, 2018 23:15:30'),
            commentary: 'Зарплата'
        },  {
            id: 13,
            amount: 28200,
            from: 6,
            to: 7,
            user_id: 1,
            date: new Date('August 15, 2018 23:15:30'),
            commentary: 'Зарплата'
        }
    ]
};

const serviceTransactions = {
    getBalanceByUserId: function(userId){
        //     let categories = [];
        //     for(let i = 0; i < DATA.categories.length; i++){
        //       if(userId === DATA.categories[i].user_id){
        //         categories.push(DATA.categories[i]);
        //       }
        //     }
        //     for(let i = 0; i < DATA.transactions.length; i++){
        //       let transactionId = DATA.transactions[i].to;
        //       for(let j = 0; j < categories.length; j++){
        //         if(transactionId === categories[j].id){

        //         }
        //       }
        //     }
        return 0.0;
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

    update: function(transactionId, amount, from, to, date, comment){
        let transaction = this.getById(transactionId);

        transaction.amount = amount || transaction.amount;
        transaction.from = from || transaction.from;
        transaction.to = to || transaction.to;
        transaction.date = date || transaction.date;
        transaction.commentary = comment || transaction.commentary;

    },

    delteById: function(transactionId){
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
        DATA.categories.find(category => category.id === categoryId);
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

    create: function(data) {
        //     const existingElement = DATA.categories.find(category => category.id === id);
        //     if(existingElement !== undefined) return;
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
        var userMockArray = DATA.users.filter(function (user) {
            return user.id === userId;
        });

        if (userMockArray && userMockArray.length) {
            return userMockArray[0];
        }
        return null;
    },

    login: function (email, password) {
        validateEmail(email);

        validatePassword(password);
        var user = DATA.users.filter(function (user) {
            return user.email === email;
        })[0];

        if ( user) {
            if ( user.password === password ){
                CURRENT_USER.id = user.id;
                return true;
            }
        }
        return false;

    },

    registration: function(userObj) {
        var user = {};
        var email = userObj.email;
        var password = userObj.password;

        if ( !!email || !!password ) {
            return {
                error: 'email and password is required'
            }
        }

        var userMockArray = DATA.users.filter(function(user) {
            return user.email === email;
        });
        if ( userMockArray.length ){
            return {
                error: 'User with this email address already exists'
            }
        }
        user.email = email;
        user.password = password;
        user.id = Date.now();
        DATA.users.push(user);
        return user;
    }
};

function validateEmail(str) {
    let pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
}

function validatePassword(string){
    let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{3,7})/;
    return strongRegex.test(string);
}
