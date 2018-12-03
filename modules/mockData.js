Object.assign(DATA, {
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
            firstName: "Oksana",
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
            currency: 'UAH',
            user_id: 1,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 2,
            icon: 'home.png',
            name: 'Home',
            type: 'Expenses',
            currency: 'UAH',
            user_id: 1,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 3,
            icon: 'car.png',
            name: 'Transport',
            type: 'Expenses',
            currency: 'UAH',
            user_id: 1,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 4,
            icon: 'cocktail.png',
            name: 'Cafe',
            type: 'Expenses',
            currency: 'UAH',
            user_id: 1,
            sharedUsers_id: [2],
            visible: true
        },  {
            id: 5,
            icon: 'gamecontroller.png',
            name: 'Games',
            type: 'Expenses',
            currency: 'USD',
            user_id: 1,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 6,
            icon: 'dollar.png',
            name: 'Salary',
            type: 'Income',
            currency: 'USD',
            user_id: 1,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 7,
            icon: 'bank.png',
            name: 'Monobank',
            type: 'Current',
            currency: 'UAH',
            user_id: 1,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 8,
            icon: 'bank.png',
            name: 'Aval bank',
            type: 'Current',
            currency: 'UAH',
            user_id: 1,
            sharedUsers_id: [2],
            visible: true
        }, {
            id: 9,
            icon: 'bank.png',
            name: 'For trip',
            type: 'Current',
            currency: 'UAH',
            user_id: 2,
            sharedUsers_id: [1],
            visible: true
        },  {
            id: 10,
            icon: 'bank.png',
            name: 'Privat',
            type: 'Current',
            currency: 'UAH',
            user_id: 2,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 11,
            icon: 'dollar.png',
            name: 'Salary',
            type: 'Income',
            currency: 'USD',
            user_id: 2,
            sharedUsers_id: [],
            visible: true
        },  {
            id: 12,
            icon: 'gamecontroller.png',
            name: 'Entertainment',
            type: 'Expenses',
            currency: 'USD',
            user_id: 2,
            sharedUsers_id: [1],
            visible: true
        },  {
            id: 13,
            icon: 'gamecontroller.png',
            name: 'Car',
            type: 'Expenses',
            currency: 'UAH',
            user_id: 2,
            sharedUsers_id: [],
            visible: true
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
        },    {
            id: 28,
            from: 9,
            fromAmount: 5000,
            to: 2,
            toAmount: 5000,
            user_id: 2,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Salmon'
        },    {
            id: 29,
            from: 10,
            fromAmount: 28000,
            to: 12,
            toAmount: 1000,
            user_id: 2,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Відеокарта'
        },    {
            id: 30,
            from: 11,
            fromAmount: 2000,
            to: 10,
            toAmount: 56000,
            user_id: 2,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'Зарплата'
        },    {
            id: 31,
            from: 10,
            fromAmount: 5000,
            to: 9,
            toAmount: 5000,
            user_id: 2,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'На подорож'
        },    {
            id: 32,
            from: 7,
            fromAmount: 2800,
            to: 12,
            toAmount: 100,
            user_id: 1,
            date: new Date('August 11, 2018 23:15:30'),
            commentary: 'SSD'
        }
    ]
});