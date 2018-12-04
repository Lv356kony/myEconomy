define({ 

    login: function(){

        let userEmail = this.view.flxLogin.flxEmail.txtEmail.text;
        let userPassword = this.view.flxLogin.flxPassword.txtPassword.text;  

        let result = userService.login(userEmail, userPassword);

        if ( result.error ) {
            let type = result.error.type;

            this.view.flxLogin.flxEmail.lblEmailError.text = '';
            this.view.flxLogin.flxPassword.lblPasswordError.text = '';

            if ( type === 'email' ) {
                this.view.flxLogin.flxEmail.lblEmailError.text = result.error.message;
            } else if (type === 'password' ) {
                this.view.flxLogin.flxPassword.lblPasswordError.text = result.error.message;

            }
        } else {
            this.view.flxLogin.flxEmail.txtEmail.text = '';
            this.view.flxLogin.flxPassword.txtPassword.text = '';
            this.view.flxLoader.isVisible = true;
            initCurrencies();
            let load = () => { 
                navToForm("frmCategoriesList");
                this.view.flxLoader.isVisible = false;
            };    
            kony.timer.schedule("mytimer", load, 3, false);



        }   

    },

    registration : function() {

        let userEmail = this.view.flxLogin.flxEmail.txtEmail.text;
        let userPassword = this.view.flxLogin.flxPassword.txtPassword.text;
        let userConfPassword = this.view.flxLogin.flxRegistration.flxConfirmation.txtConfirmation.text;

        let result = userService.registration(userEmail, userPassword, userConfPassword);

        if ( result.error ) {
            let type = result.error.type;

            this.view.flxLogin.flxEmail.lblEmailError.text = '';
            this.view.flxLogin.flxPassword.lblPasswordError.text = '';
            this.view.flxLogin.flxRegistration.flxConfirmation.lblConfirmationError.text ='';

            if ( type === 'email' ) {
                this.view.flxLogin.flxEmail.lblEmailError.text = result.error.message;    
            } else if (type === 'password' ) {
                this.view.flxLogin.flxPassword.lblPasswordError.text = result.error.message; 
            } else if (type === 'passwordConfirmation' ) {
                this.view.flxLogin.flxRegistration.flxConfirmation.lblConfirmationError.text = result.error.message;
            } 
        } else {
            this.createDefaultCategories(result);
            this.view.flxLogin.flxRegistration.isVisible=false; 
            this.view.flxLogin.flxButtonLogin.isVisible=true;

            this.view.flxLogin.flxEmail.txtEmail.text = '';
            this.view.flxLogin.flxPassword.txtPassword.text = '';
            this.view.flxLogin.flxRegistration.flxConfirmation.txtConfirmation.text = '';

            this.view.flxLogin.flxEmail.lblEmailError.text = '';
            this.view.flxLogin.flxPassword.lblPasswordError.text = '';
            this.view.flxLogin.flxRegistration.flxConfirmation.lblConfirmationError.text ='';

        }   
    },


    createAccount: function(){

        this.view.flxLogin.lblEmailError.text = '';
        this.view.flxLogin.lblPasswordError.text = '';
        this.view.flxLogin.flxRegistration.flxConfirmation.lblConfirmationError.text ='';

        this.view.flxLogin.flxEmail.txtEmail.text = '';
        this.view.flxLogin.flxPassword.txtPassword.text = '';
        this.view.flxLogin.flxRegistration.flxConfirmation.txtConfirmation.text = '';

        this.view.flxLogin.flxButtonLogin.isVisible=false;
        this.view.flxLogin.flxCreateAccount.isVisible=false;
        this.view.flxLogin.flxRegistration.isVisible=true;

        this.view.flxLogin.flxEmail.txtEmail.setFocus(true);



    },

    goToLogin: function(){

        this.view.flxLogin.flxRegistration.isVisible=false;
        this.view.flxLogin.flxButtonLogin.isVisible=true;
        this.view.flxLogin.flxCreateAccount.isVisible=true;

        this.view.flxLogin.lblEmailError.text = '';
        this.view.flxLogin.lblPasswordError.text = '';
        this.view.flxLogin.flxRegistration.flxConfirmation.lblConfirmationError.text ='';

        this.view.flxLogin.flxEmail.txtEmail.text = '';
        this.view.flxLogin.flxPassword.txtPassword.text = '';
        this.view.flxLogin.flxRegistration.flxConfirmation.txtConfirmation.text = '';

    },
    cleanEmailError: function(){
        this.view.flxLogin.lblEmailError.text = '';

    },
    cleanPasswordError: function(){
        this.view.flxLogin.lblPasswordError.text = '';
    },
    cleanConfPasswordError(){
        this.view.flxLogin.flxRegistration.flxConfirmation.lblConfirmationError.text ='';

    },

    createDefaultCategories: function (userId) {
        let namesAndIcons = [
            {
                name: 'Groceries',
                icon : 'bill.png',
                type: 'Expenses'
            },
            {
                name: 'Home',
                icon : 'home.png',
                type: 'Expenses'
            },
            {
                name: 'Transport',
                icon : 'car.png',
                type: 'Expenses'
            },
            {
                name: 'Cafe',
                icon : 'cocktail.png',
                type: 'Expenses'
            },
            {
                name: 'Games',
                icon : 'gamecontroller.png',
                type: 'Expenses'
            },
            {
                name: 'Salary',
                icon : 'dollar.png',
                type: 'Income'
            },
            {
                name: 'Bank',
                icon : 'bank.png',
                type: 'Current'
            }
        ];
        namesAndIcons.forEach(arr => {
            let data = {
                id: Date.now(),
                icon: arr.icon,
                name: arr.name,
                type: arr.type,
                currency: 'UAH',
                user_id: userId,
                sharedUsers_id: [],
                visible: true 
            };
            serviceCategoryRefactored.create(data); 
        });

    }


});













