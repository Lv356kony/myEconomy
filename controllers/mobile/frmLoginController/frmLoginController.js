define({ 
    
    login: function(){

        let userEmail = this.view.flxLogin.flxEmail.txtEmail.text;
        let userPassword = this.view.flxLogin.flxPassword.txtPassword.text;  


        let result = userService.login(userEmail, userPassword);

        if ( result.error ) {
            let type = result.error.type;
            //var message = result.error.message;

            this.view.flxLogin.lblEmailError.text = '';
            this.view.flxLogin.lblPasswordError.text = '';

            if ( type === 'email' ) {
                this.view.flxLogin.lblEmailError.text = result.error.message;
            } else if (type === 'password' ) {
                this.view.flxLogin.lblPasswordError.text = result.error.message;

            }
        } else {
            this.view.flxLogin.flxEmail.txtEmail.text = '';
            this.view.flxLogin.flxPassword.txtPassword.text = '';
            navToForm("frmTest");    
        }    
    },

    registration : function() {

        let userEmail = this.view.flxLogin.flxEmail.txtEmail.text;
        let userPassword = this.view.flxLogin.flxPassword.txtPassword.text;
        let userConfPassword = this.view.flxLogin.flxConfirmation.txtConfirmation.text;

       
        let result = userService.registration(userEmail, userPassword, userConfPassword);

           if ( result.error ) {
              let type = result.error.type;

              this.view.flxLogin.lblEmailError.text = '';
              this.view.flxLogin.lblPasswordError.text = '';
              this.view.flxLogin.lblConfirmationError.text ='';


            if ( type === 'email' ) {
                this.view.flxLogin.lblEmailError.text = result.error.message;    
            } else if (type === 'password' ) {
                this.view.flxLogin.lblPasswordError.text = result.error.message; 
            } else if (type === 'passwordConfirmation' ) {
                this.view.flxLogin.lblConfirmationError.text = result.error.message;
            } 
        } else {

            this.view.flxLogin.flxConfirmation.isVisible=false;
            this.view.flxLogin.lblConfirmationError.isVisible=false;
            this.view.flxLogin.flxButtonRegister.isVisible=false; 
            this.view.flxLogin.flxButtonLogin.isVisible=true;


            this.view.flxLogin.flxEmail.txtEmail.text = '';
            this.view.flxLogin.flxPassword.txtPassword.text = '';
            this.view.flxLogin.flxConfirmation.txtConfirmation.text = '';

            this.view.flxLogin.lblEmailError.text = '';
            this.view.flxLogin.lblPasswordError.text = '';
            this.view.flxLogin.lblConfirmationError.text ='';




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

    }

});





  






