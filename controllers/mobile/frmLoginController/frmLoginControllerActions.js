define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnCreateAccount **/
    AS_Button_bc68cf59db484e9b8031ca8335c09c68: function AS_Button_bc68cf59db484e9b8031ca8335c09c68(eventobject) {
        var self = this;
        return self.createAccount.call(this);
    },
    /** onClick defined for btnLogin **/
    AS_Button_hc7481644af2493aa718baae0c1014c6: function AS_Button_hc7481644af2493aa718baae0c1014c6(eventobject) {
        var self = this;
        return self.login.call(this);
    },
    /** onClick defined for btnRegister **/
    AS_Button_j57fa6913ee7438c90bc21fcebdcfcfd: function AS_Button_j57fa6913ee7438c90bc21fcebdcfcfd(eventobject) {
        var self = this;
        return self.registration.call(this);
    },
    /** onOrientationChange defined for frmLogin **/
    AS_Form_bce8f418ade1455d8be2bdddf93637b1: function AS_Form_bce8f418ade1455d8be2bdddf93637b1(eventobject) {
        var self = this;
    },
    /** onTextChange defined for txtEmail **/
    AS_TextField_i7e412883bbb4daf967005bf2fd4b72f: function AS_TextField_i7e412883bbb4daf967005bf2fd4b72f(eventobject, changedtext) {
        var self = this;
        return self.cleanEmailError.call(this);
    },
    /** onClick defined for btnBackToLogin **/
    AS_Button_b3069b31a6844a21a116f80652eac004: function AS_Button_b3069b31a6844a21a116f80652eac004(eventobject) {
        var self = this;
        return self.goToLogin.call(this);
    },
    /** onTextChange defined for txtPassword **/
    AS_TextField_d984052da1784ce5a9253faa6566876e: function AS_TextField_d984052da1784ce5a9253faa6566876e(eventobject, changedtext) {
        var self = this;
        return self.cleanPasswordError.call(this);
    },
    /** onTextChange defined for txtConfirmation **/
    AS_TextField_e312c4ae7eca431599e8532894e76484: function AS_TextField_e312c4ae7eca431599e8532894e76484(eventobject, changedtext) {
        var self = this;
        return self.cleanConfPasswordErro.call(this);
    }
});