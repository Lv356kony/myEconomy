define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onBeginEditing defined for txtEmail **/
    AS_TextField_f2dc01e8df8c439e91fe577c171ec128: function AS_TextField_f2dc01e8df8c439e91fe577c171ec128(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmEmail.skin = "CopyskEmailISF";
            }, null);
        } else {
            (function() {
                self.view.frmEmail.skin = "CopyskEmailISF";
            })();
        }
    },
    /** onEndEditing defined for txtEmail **/
    AS_TextField_cfae64f9051c432c8db4031ecf312c7a: function AS_TextField_cfae64f9051c432c8db4031ecf312c7a(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmEmail.skin = "CopyskEmailISNormal";
            }, null);
        } else {
            (function() {
                self.view.frmEmail.skin = "CopyskEmailISNormal";
            })();
        }
        //Reset the skin to Normal since the textbox is empty
        if (/^\s*$/.test(this.view.frmEmail.txtEmail.text)) {
            self.view.frmEmail["skin"] = "skEmailISNormal"
            self.view.frmEmail.txtEmail["skin"] = "skUNIRN"
            return
        }
        //If it is not empty then check for email validation
        else {
            if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(this.view.frmEmail.txtEmail.text)) {
                self.view.frmEmail["skin"] = "skEmailISNormal"
                self.view.frmEmail.txtEmail["skin"] = "skUNIRN"
            } else {
                self.view.frmEmail["skin"] = "skEmailISRed";
                self.view.frmEmail.txtEmail["skin"] = "skUNIRRed";
            }
        }
    },
    /** onBeginEditing defined for txtEmail **/
    AS_TextField_695e4e01b4084d8d8121e5cf724da6eb: function AS_TextField_695e4e01b4084d8d8121e5cf724da6eb(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmEmail.skin = "CopyskEmailISF";
            }, null);
        } else {
            (function() {
                self.view.frmEmail.skin = "CopyskEmailISF";
            })();
        }
    },
    /** onEndEditing defined for txtEmail **/
    AS_TextField_6378df3644db40e3b9650ca9f42f88dd: function AS_TextField_6378df3644db40e3b9650ca9f42f88dd(eventobject, changedtext) {
        var self = this;
        if (kony.theme.getCurrentTheme() != "default") {
            kony.theme.setCurrentTheme("default", function() {
                self.view.frmEmail.skin = "CopyskEmailISNormal";
            }, null);
        } else {
            (function() {
                self.view.frmEmail.skin = "CopyskEmailISNormal";
            })();
        }
        //Reset the skin to Normal since the textbox is empty
        if (/^\s*$/.test(this.view.frmEmail.txtEmail.text)) {
            self.view.frmEmail["skin"] = "skEmailISNormal"
            self.view.frmEmail.txtEmail["skin"] = "skUNIRN"
            return
        }
        //If it is not empty then check for email validation
        else {
            if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(this.view.frmEmail.txtEmail.text)) {
                self.view.frmEmail["skin"] = "skEmailISNormal"
                self.view.frmEmail.txtEmail["skin"] = "skUNIRN"
            } else {
                self.view.frmEmail["skin"] = "skEmailISRed";
                self.view.frmEmail.txtEmail["skin"] = "skUNIRRed";
            }
        }
    }
});