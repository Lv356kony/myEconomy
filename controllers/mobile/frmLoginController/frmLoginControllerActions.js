define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTextChange defined for txtEmail **/
    AS_TextField_i7e412883bbb4daf967005bf2fd4b72f: function AS_TextField_i7e412883bbb4daf967005bf2fd4b72f(eventobject, changedtext) {
        var self = this;
        return self.cleanEmailError.call(this);
    },
    /** onTextChange defined for txtPassword **/
    AS_TextField_d984052da1784ce5a9253faa6566876e: function AS_TextField_d984052da1784ce5a9253faa6566876e(eventobject, changedtext) {
        var self = this;
        return self.cleanPasswordError.call(this);
    },
    /** onClick defined for btnLogin **/
    AS_Button_hc7481644af2493aa718baae0c1014c6: function AS_Button_hc7481644af2493aa718baae0c1014c6(eventobject) {
        var self = this;
        return self.login.call(this);
    },
    /** onClick defined for btnCreateAccount **/
    AS_Button_bc68cf59db484e9b8031ca8335c09c68: function AS_Button_bc68cf59db484e9b8031ca8335c09c68(eventobject) {
        var self = this;
        return self.createAccount.call(this);
    },
    /** onTextChange defined for txtConfirmation **/
    AS_TextField_b52af6ca702346c197669d0bf1e0730c: function AS_TextField_b52af6ca702346c197669d0bf1e0730c(eventobject, changedtext) {
        var self = this;
        return self.cleanConfPasswordError.call(this);
    },
    /** onClick defined for btnRegister **/
    AS_Button_h3205f1e0f7846eaa2d6590982d20684: function AS_Button_h3205f1e0f7846eaa2d6590982d20684(eventobject) {
        var self = this;
        return self.registration.call(this);
    },
    /** onClick defined for btnBackToLogin **/
    AS_Button_caea3aed3cca4ee1baa4bdcb2bfb4412: function AS_Button_caea3aed3cca4ee1baa4bdcb2bfb4412(eventobject) {
        var self = this;
        return self.goToLogin.call(this);
    }
});