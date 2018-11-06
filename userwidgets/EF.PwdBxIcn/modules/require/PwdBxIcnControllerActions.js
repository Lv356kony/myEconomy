define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_TextField_79de7b9dbc164788a561b36cb34b3d2f: function AS_TextField_79de7b9dbc164788a561b36cb34b3d2f(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmPwdName["skin"] = "skPWDSFocus";
            }, null);
        } else {
            (function() {
                self.view.frmPwdName["skin"] = "skPWDSFocus";
            })();
        }
    },
    AS_TextField_06ab01183a50442b9c2f262c92c0b649: function AS_TextField_06ab01183a50442b9c2f262c92c0b649(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmPwdName["skin"] = "skPWDSNormal";
            }, null);
        } else {
            (function() {
                self.view.frmPwdName["skin"] = "skPWDSNormal";
            })();
        }
        //Password validation Logic
        //Length as 6 to 16
        //Password has a one capital Alpha,one Small alpha, one Numeric and one Special Character
        //Special Charactrs include !@#$%^&*_
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{6,16}$/;
        //Check if the field is empty then set the text to Normal else check for Validation
        if (/^\s*$/.test(this.view.frmPwdName.txtPassword.text)) {
            self.view.frmPwdName["skin"] = "skPWDSNormal"
            self.view.txtPassword["skin"] = "skUNIRN"
        } else {
            //Check if Password has all the required validations and set skin to Normal
            if (regularExpression.test(this.view.frmPwdName.txtPassword.text)) {
                self.view.frmPwdName["skin"] = "skPWDSNormal"
                self.view.txtPassword["skin"] = "skUNIRN"
            } else
            //Check if Password is failing any required validations and set skin to Red  
            {
                self.view.frmPwdName["skin"] = "skPWDSRed"
                self.view.txtPassword["skin"] = "skUNIRRed"
            }
        }
    },
    AS_TextField_a5b8da3c57124ccabc79daff58d85b3d: function AS_TextField_a5b8da3c57124ccabc79daff58d85b3d(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmPwdName["skin"] = "skPWDSFocus";
            }, null);
        } else {
            (function() {
                self.view.frmPwdName["skin"] = "skPWDSFocus";
            })();
        }
    },
    AS_TextField_d30c59624cb94b9ca91bf71ab96536f8: function AS_TextField_d30c59624cb94b9ca91bf71ab96536f8(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmPwdName["skin"] = "skPWDSNormal";
            }, null);
        } else {
            (function() {
                self.view.frmPwdName["skin"] = "skPWDSNormal";
            })();
        }
        //Password validation Logic
        //Length as 6 to 16
        //Password has Alpha, Numeric and Special Character
        //Special Charactrs include !@#$%^&*_
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        //Check if the field is empty then set the text to Normal else check for Validation
        if (/^\s*$/.test(this.view.frmPwdName.txtPassword.text)) {
            self.view.frmPwdName["skin"] = "skPWDSNormal"
            self.view.txtPassword["skin"] = "skUNIRN"
        } else {
            //Check if Password has all the required validations and set skin to Normal
            if (regularExpression.test(this.view.frmPwdName.txtPassword.text)) {
                self.view.frmPwdName["skin"] = "skPWDSNormal"
                self.view.txtPassword["skin"] = "skUNIRN"
            } else
            //Check if Password is failing any required validations and set skin to Red  
            {
                self.view.frmPwdName["skin"] = "skPWDSRed"
                self.view.txtPassword["skin"] = "skUNIRRed"
            }
        }
    }
});