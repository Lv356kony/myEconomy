define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for btnSideMenu **/
    AS_Button_b5ae778be6fd405992be05edc2d23bde: function AS_Button_b5ae778be6fd405992be05edc2d23bde(eventobject, x, y) {
        var self = this;
        return self.showMenu.call(this);
    },
    /** onDownloadComplete defined for imgStatistics **/
    AS_Image_e7fce7adae24495fb97f56cdba848e5d: function AS_Image_e7fce7adae24495fb97f56cdba848e5d(eventobject, imagesrc, issuccess) {
        var self = this;
    },
    /** onTouchEnd defined for btnStatistics **/
    AS_Button_f225ba20b4c64004bccbcb210ca50db5: function AS_Button_f225ba20b4c64004bccbcb210ca50db5(eventobject, x, y) {
        var self = this;
        return self.goToStatistics.call(this);
    },
    /** onTouchEnd defined for btnLogOut **/
    AS_Button_a61942448b7045b4bfa7a9492ab4ea61: function AS_Button_a61942448b7045b4bfa7a9492ab4ea61(eventobject, x, y) {
        var self = this;
        return self.logOut.call(this);
    },
    /** onClick defined for btnHideMenu **/
    AS_Button_b5a0c227f41c43d1957b4158ccfe233e: function AS_Button_b5a0c227f41c43d1957b4158ccfe233e(eventobject) {
        var self = this;
        return self.hideMenu.call(this);
    },
    /** onTouchStart defined for flxHideMenu **/
    AS_FlexContainer_f108f26df11347a1b5a0de2ae288a983: function AS_FlexContainer_f108f26df11347a1b5a0de2ae288a983(eventobject, x, y) {
        var self = this;
    },
    /** preShow defined for frmSideMenu **/
    AS_Form_gb417cca5bd242ce846a82a504e383b6: function AS_Form_gb417cca5bd242ce846a82a504e383b6(eventobject) {
        var self = this;
        return self.showUserInfo.call(this);
    }
});