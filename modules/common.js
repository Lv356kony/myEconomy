function navToForm(formName){
    let target = new kony.mvc.Navigation(formName);
    target.navigate();
  }
  
  const CURRENT_USER = {id: 1};
  
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
        commentary: 'Продукти'
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
        commentary: 'Кварплата'
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
        date: new Date('September 15, 2018 23:15:30'),
        commentary: 'Зарплата'
      }
    ]  
  };
  const serviceTransactions = {
    create: function(id, amount, from, to, userId, date, comment){
        let transaction = {};
        transaction.id = id;
        transaction.amount = amount;
        transaction.from = from;
        transaction.to = to;
        transaction.userId = userId;
        transaction.date = date;
        transaction.comment = comment;
        
        DATA.transactions.push(transaction);
    
    },

    getBalanceByUserId: function(userId){
        let categories = [];
        for(let i = 0; i < DATA.categories.length; i++){
            if(userId === DATA.categories[i].user_id){
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

        let countExpenses = 0.0;
        let countIncome = 0.0;
        for(let i = 0; i < DATA.transactions.length; i++){
            for(let j = 0; j < expensesIds.length; j++){
                if(DATA.transactions[i].to === expensesIds[j]){
                    countExpenses += DATA.transactions[i].amount;
                }
            }
        }

        for(let i = 0; i < DATA.transactions.length; i++){
            for(let j = 0; j < incomeIds.length; j++){
                if(DATA.transactions[i].from === incomeIds[j]){
                    countIncome += DATA.transactions[i].amount;
                }
            }
        }
      
       return countIncome - countExpenses;
    },
    
    getBalanceByCategoryId: function(categoryId){
        let categoryBalance = 0.0;
        for(let i = 0; i < DATA.transactions.length; i++){
            if(DATA.transactions[i].to === categoryId){
                categoryBalance += DATA.transactions[i].amount;
            }
        }
    return categoryBalance;
    }
 };
















