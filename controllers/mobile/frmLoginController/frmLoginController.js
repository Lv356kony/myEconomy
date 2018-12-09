define({ 

    login: function(){

        let userEmail = this.view.txtEmail.text;
        let userPassword = this.view.txtPassword.text;  

        let result = userService.login(userEmail, userPassword);

        if ( result.error ) {
            let type = result.error.type;
            this.view.flxEmailError.isVisible = false;
            this.view.flxPasswordError.isVisible = false;

            this.view.lblEmailError.text = '';
            this.view.lblPasswordError.text = '';

            if ( type === 'email' ) {
                this.view.flxEmailError.isVisible = true;
                this.view.lblEmailError.text = result.error.message;
            } else if (type === 'password' ) {
                this.view.flxPasswordError.isVisible = true;
                this.view.lblPasswordError.text = result.error.message;

            }
        } else {
            this.view.txtEmail.text = '';
            this.view.txtPassword.text = '';
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

        let userEmail = this.view.txtEmail.text;
        let userPassword = this.view.txtPassword.text;
        let userConfPassword = this.view.txtConfirmation.text;
        

        let result = userService.registration(userEmail, userPassword, userConfPassword);

        if ( result.error ) {
            let type = result.error.type;

            this.view.lblEmailError.text = '';
            this.view.lblPasswordError.text = '';
            this.view.lblConfirmationError.text ='';

            if ( type === 'email' ) {
                this.view.flxEmailError.isVisible = true;
                this.view.lblEmailError.text = result.error.message;    
            } else if (type === 'password' ) {
                this.view.flxPasswordError.isVisible = true;
                this.view.lblPasswordError.text = result.error.message; 
            } else if (type === 'passwordConfirmation' ) {
                this.view.flxConfirmationError.isVisible = true;
                this.view.lblConfirmationError.text = result.error.message;
            } 
        } else {
            this.createDefaultCategories(result);
            this.view.flxRegistration.isVisible=false; 
            this.view.flxButtonLogin.isVisible=true;
            this.view.flxCreateAccount.isVisible=true;
            

            this.view.txtEmail.text = '';
            this.view.txtPassword.text = '';
            this.view.txtConfirmation.text = '';

            this.view.lblEmailError.text = '';
            this.view.lblPasswordError.text = '';
            this.view.lblConfirmationError.text ='';

        }   
    },


    createAccount: function(){

        this.view.lblEmailError.text = '';
        this.view.lblPasswordError.text = '';
        this.view.lblConfirmationError.text ='';

        this.view.txtEmail.text = '';
        this.view.txtPassword.text = '';
        this.view.txtConfirmation.text = '';
       
         this.view.flxEmailError.isVisible = false;
         this.view.flxPasswordError.isVisible = false;
         this.view.flxConfirmationError.isVisible = false;
        

        this.view.flxButtonLogin.isVisible=false;
        this.view.flxCreateAccount.isVisible=false;
        this.view.flxRegistration.isVisible=true;
        
        this.view.txtEmail.setFocus(true);
        
        

    },

    goToLogin: function(){

        this.view.flxRegistration.isVisible=false;
        this.view.flxButtonLogin.isVisible=true;
        this.view.flxCreateAccount.isVisible=true;

        this.view.lblEmailError.text = '';
        this.view.lblPasswordError.text = '';
        this.view.lblConfirmationError.text ='';

        this.view.txtEmail.text = '';
        this.view.txtPassword.text = '';
        this.view.txtConfirmation.text = '';
        
        this.view.flxEmailError.isVisible = false;
        this.view.flxPasswordError.isVisible = false;
         this.view.flxConfirmationError.isVisible = false;
        

    },
    cleanEmailError: function(){
        this.view.lblEmailError.text = '';
         this.view.flxEmailError.isVisible = false;

    },
    cleanPasswordError: function(){
        this.view.lblPasswordError.text = '';
       this.view.flxPasswordError.isVisible = false;
    },
    cleanConfPasswordError(){
        this.view.lblConfirmationError.text ='';
         this.view.flxConfirmationError.isVisible = false;
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