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
            navToForm("frmCategoriesList");    
        }    
    },

    registration : function() {

        let userEmail = this.view.flxLogin.flxEmail.txtEmail.text;
        let userPassword = this.view.flxLogin.flxPassword.txtPassword.text;
        let userConfPassword = this.view.flxLogin.flxConfirmation.txtConfirmation.text;

       
        let result = userService.registration(userEmail, userPassword, userConfPassword);

           if ( result.error ) {
              let type = result.error.type;

              this.view.flxLogin.flxEmail.lblEmailError.text = '';
              this.view.flxLogin.flxPassword.lblPasswordError.text = '';
              this.view.flxLogin.flxConfirmation.lblConfirmationError.text ='';


            if ( type === 'email' ) {
                this.view.flxLogin.flxEmail.lblEmailError.text = result.error.message;    
            } else if (type === 'password' ) {
                this.view.flxLogin.flxPassword.lblPasswordError.text = result.error.message; 
            } else if (type === 'passwordConfirmation' ) {
                this.view.flxLogin.flxConfirmation.lblConfirmationError.text = result.error.message;
            } 
        } else {

            this.view.flxLogin.flxConfirmation.isVisible=false;
            this.view.flxLogin.flxButtonRegister.isVisible=false; 
            this.view.flxLogin.flxButtonLogin.isVisible=true;


            this.view.flxLogin.flxEmail.txtEmail.text = '';
            this.view.flxLogin.flxPassword.txtPassword.text = '';
            this.view.flxLogin.flxConfirmation.txtConfirmation.text = '';

            this.view.flxLogin.flxEmail.lblEmailError.text = '';
            this.view.flxLogin.flxPassword.lblPasswordError.text = '';
            this.view.flxLogin.flxConfirmation.lblConfirmationError.text ='';

        }   
    },


    createAccount: function(){
        this.view.flxLogin.lblEmailError.text = '';
        this.view.flxLogin.lblPasswordError.text = '';
        this.view.flxLogin.flxEmail.txtEmail.text = '';
        this.view.flxLogin.flxPassword.txtPassword.text = '';


        this.view.flxLogin.flxConfirmation.isVisible=true;
        this.view.flxLogin.lblConfirmationError.isVisible=true;
        this.view.flxLogin.flxButtonLogin.isVisible=false;
        this.view.flxLogin.flxCreateAccount.isVisible=false;
        this.view.flxLogin.flxButtonRegister.isVisible=true;  
        this.view.flxLogin.flxbuttonBackToLogin.isVisible=true; 

    },
    
    goToLogin: function(){
        this.view.flxLogin.flxConfirmation.isVisible=false;
        this.view.flxLogin.flxButtonRegister.isVisible=false;
        this.view.flxLogin.flxButtonLogin.isVisible=true;
        this.view.flxLogin.flxCreateAccount.isVisible=true;
        this.view.flxLogin.flxbuttonBackToLogin.isVisible=false; 
        
        this.view.flxLogin.lblEmailError.text = '';
        this.view.flxLogin.lblPasswordError.text = '';
        this.view.flxLogin.flxEmail.txtEmail.text = '';
        this.view.flxLogin.flxPassword.txtPassword.text = '';
        
    },
     cleanEmailError: function(){
          this.view.flxLogin.lblEmailError.text = '';
         
     },
    cleanPasswordError: function(){
        this.view.flxLogin.lblPasswordError.text = '';
    },
    cleanConfPasswordError(){
        this.view.flxLogin.flxConfirmation.lblConfirmationError.text ='';
        
    }

});





  







