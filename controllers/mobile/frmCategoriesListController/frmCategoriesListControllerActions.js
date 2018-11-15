define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segmIncome **/
    AS_Segment_b5841b0ab0f442209d15bdb5c840d8eb: function AS_Segment_b5841b0ab0f442209d15bdb5c840d8eb(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject);
    },
    /** onRowClick defined for segmCurrent **/
    AS_Segment_cd1813046cc74b939f7c6de679ebf49a: function AS_Segment_cd1813046cc74b939f7c6de679ebf49a(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject);
    },
    /** onRowClick defined for segmExpenses **/
    AS_Segment_f353746986dd4760aa4632d92f13dc00: function AS_Segment_f353746986dd4760aa4632d92f13dc00(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject);
    },
    /** preShow defined for frmCategoriesList **/
    AS_Form_ee877c39514d4bbc9c47de5d059486d7: function AS_Form_ee877c39514d4bbc9c47de5d059486d7(eventobject) {
        var self = this;
        self.initIncomeCategoriesList.call(this);
        self.initCurrentCategoriesList.call(this);
        self.initExpensesCategoriesList.call(this);
        self.hideMenu.call(this);
    },
    /** onDownloadComplete defined for imgStatistics **/
    AS_Image_ae419f977f0a451a9cea791adeab21db: function AS_Image_ae419f977f0a451a9cea791adeab21db(eventobject, imagesrc, issuccess) {
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
    AS_Button_c673c97ca6a54f5c9dabe70dcd9b1dd2: function AS_Button_c673c97ca6a54f5c9dabe70dcd9b1dd2(eventobject) {
        var self = this;
        return self.hideMenu.call(this);
    },
    /** onTouchStart defined for flxHideMenu **/
    AS_FlexContainer_i8e9716968c140d9a92d76bd95273bff: function AS_FlexContainer_i8e9716968c140d9a92d76bd95273bff(eventobject, x, y) {
        var self = this;
    },
    /** onTouchEnd defined for btnHamburger **/
    AS_Button_ea6d136e3a1b4a29959d28d7c2431208: function AS_Button_ea6d136e3a1b4a29959d28d7c2431208(eventobject, x, y) {
        var self = this;
        self.showUserInfo.call(this);
        self.showMenu.call(this);
    }
});