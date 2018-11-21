define({ 

    init: function () {
        this.setDataForCurrency();
        this.view.txbFirstName.text = userService.getById(CURRENT_USER.id).firstName;
        this.view.txbLastName.text =userService.getById(CURRENT_USER.id).lastName;
        this.view.flxNewPasswordContainer1.isVisible = false;
        this.view.flxNewPasswordContainer2.isVisible = false;
        this.view.flxOldPasswordError.isVisible = false;
        this.view.flxNewPassword1Error.isVisible = false;
        this.view.flxNewPassword2Error.isVisible = false;
    },

    clickBackwardButton: function () {
        navToForm("frmCategoriesList");
    },

    //     openFile: function (){
    //         var config = {
    //             selectMultipleFiles: true,
    //             filter: ["image/png", "image/jpeg"]
    //         };
    //         var selectedFileCallback = function(event, filelist) {
    //           //logic to iterate filelist
    //         };
    //        //kony.io.FileSystem.browse(config, selectedFileCallback);
    //         var querycontext = {mimetype:"image/*"};
    //         kony.phone.openMediaGallery(selectedFileCallback, querycontext);
    //     },

    setDataForCurrency: function () {
        let currency = this.view.lstCurrency;
        let data = CURRENCIES.map((element, i) => {
            return [i, element];
        });
        currency.masterData = data;
        currency.selectedKey = data[0][0];
    },

    seveSettings: function () {
        let firstName = this.view.txbFirstName.text;
        let lastName = this.view.txbLastName.text;
        let currency = this.view.lstCurrency.selectedKeyValue[1];
        let password;
        let image;
        if(this.verficationNewPassword("check") && this.confirmNewPassword("check")) {
            password = this.view.txbNewPassword2.text;
        }
        
        userService.updateUser(firstName, lastName, password, currency, image);
    },

    verficationOldPassword: function () {
        if (this.view.txbOldPassword1.text === userService.getById(CURRENT_USER.id).password) {
            this.view.flxNewPasswordContainer1.isVisible = true;
            this.view.flxOldPasswordError.isVisible = false;
            return true;
        } else {
            this.view.flxOldPasswordError.isVisible = true;
            return false;
        }

    },
// If the type has value, then the error message does not appear
    verficationNewPassword: function (type) {
        if (validatePassword(this.view.txbNewPassword1.text)) {
            this.view.flxNewPasswordContainer2.isVisible = true;
            this.view.flxNewPassword1Error.isVisible = false;
            return true;
        } else {
            if(!type) {
            this.view.flxNewPassword1Error.isVisible = true;
            }
            return false;
        }

    },
// If the type has value, then the error message does not appear    
    confirmNewPassword: function (type) {
        if(this.view.txbNewPassword1.text === this.view.txbNewPassword2.text) {
            this.view.flxNewPassword2Error.isVisible = false;
            return true;
        }else {
            if(!type) {
            this.view.flxNewPassword2Error.isVisible = true;
            }
            return false;
        }
    },

    clickSaveButton: function () {
        this.seveSettings();
        this.view.flxNewPassword1Error.isVisible = false;
        this.view.flxNewPassword2Error.isVisible = false;
        navToForm("frmCategoriesList");
    }


});