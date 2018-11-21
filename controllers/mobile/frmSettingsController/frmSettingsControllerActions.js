define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxHeaderBackWard **/
    AS_FlexContainer_ed84653ea9af4085ad95ab3b469c4cd0: function AS_FlexContainer_ed84653ea9af4085ad95ab3b469c4cd0(eventobject) {
        var self = this;
        return self.clickBackwardButton.call(this);
    },
    /** postShow defined for frmSettings **/
    AS_Form_f136f031b0c74bfab195eb52604b1092: function AS_Form_f136f031b0c74bfab195eb52604b1092(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** onClick defined for Button0j7c41ee31c9149 **/
    AS_Button_c6fc7f080ef7440a8aa11456ae2ddbce: function AS_Button_c6fc7f080ef7440a8aa11456ae2ddbce(eventobject) {
        var self = this;
        return self.clickSaveButton.call(this);
    },
    /** onTextChange defined for txbOldPassword1 **/
    AS_TextField_da5ebf237a0940f6bb6c27c18dd7556d: function AS_TextField_da5ebf237a0940f6bb6c27c18dd7556d(eventobject, changedtext) {
        var self = this;
        return self.verficationOldPassword.call(this);
    },
    /** onTextChange defined for txbNewPassword1 **/
    AS_TextField_d94565d2cd12413b854bc09f98f86356: function AS_TextField_d94565d2cd12413b854bc09f98f86356(eventobject, changedtext) {
        var self = this;
        return self.verficationNewPassword.call(this);
    },
    /** onTextChange defined for txbNewPassword2 **/
    AS_TextField_fc06c682cac24220a3c3930d27a9d783: function AS_TextField_fc06c682cac24220a3c3930d27a9d783(eventobject, changedtext) {
        var self = this;
        return self.confirmNewPassword.call(this);
    }
});