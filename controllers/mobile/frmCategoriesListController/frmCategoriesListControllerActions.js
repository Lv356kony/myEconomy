define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segmExpenses **/
    AS_Segment_f353746986dd4760aa4632d92f13dc00: function AS_Segment_f353746986dd4760aa4632d92f13dc00(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject);
    },
    /** onClick defined for flxAddExpenses **/
    AS_FlexContainer_e1f8bac1ba84451a855e2ea89fec8761: function AS_FlexContainer_e1f8bac1ba84451a855e2ea89fec8761(eventobject) {
        var self = this;
        return self.setCategoryExpensesType.call(this);
    },
    /** onClick defined for flxExpenses **/
    AS_FlexContainer_je32ba2ff61244a081906f245fac0f07: function AS_FlexContainer_je32ba2ff61244a081906f245fac0f07(eventobject) {
        var self = this;
        return self.showExpense.call(this);
    },
    /** onRowClick defined for segmCurrent **/
    AS_Segment_cd1813046cc74b939f7c6de679ebf49a: function AS_Segment_cd1813046cc74b939f7c6de679ebf49a(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject);
    },
    /** onClick defined for flxAddCurrent **/
    AS_FlexContainer_c0ab460c24d645b49f8ee95460a64e4f: function AS_FlexContainer_c0ab460c24d645b49f8ee95460a64e4f(eventobject) {
        var self = this;
        return self.setCategoryCurrentType.call(this);
    },
    /** onClick defined for flxCurrent **/
    AS_FlexContainer_i4216e1d243b465e82c5422a7b71e59a: function AS_FlexContainer_i4216e1d243b465e82c5422a7b71e59a(eventobject) {
        var self = this;
        return self.showCurrent.call(this);
    },
    /** onRowClick defined for segmIncome **/
    AS_Segment_b5841b0ab0f442209d15bdb5c840d8eb: function AS_Segment_b5841b0ab0f442209d15bdb5c840d8eb(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject);
    },
    /** onClick defined for flxAddIncome **/
    AS_FlexContainer_c6dd2fe96d594d789ff7a72aef585a0c: function AS_FlexContainer_c6dd2fe96d594d789ff7a72aef585a0c(eventobject) {
        var self = this;
        return self.setCategoryIncomeType.call(this);
    },
    /** onClick defined for flxIncome **/
    AS_FlexContainer_c20d782d3f0c41a39e2b244636427158: function AS_FlexContainer_c20d782d3f0c41a39e2b244636427158(eventobject) {
        var self = this;
        return self.showIncome.call(this);
    },
    /** onTouchEnd defined for btnHamburger **/
    AS_Button_ea6d136e3a1b4a29959d28d7c2431208: function AS_Button_ea6d136e3a1b4a29959d28d7c2431208(eventobject, x, y) {
        var self = this;
        self.showUserInfo.call(this);
        self.showMenu.call(this);
    },
    /** onClick defined for flxExpensesButton **/
    AS_FlexContainer_hdaeaa9151404938946ad71a89caacf7: function AS_FlexContainer_hdaeaa9151404938946ad71a89caacf7(eventobject) {
        var self = this;
        return self.goToCreationExpensesTransaction.call(this);
    },
    /** onClick defined for flxCurrentButton **/
    AS_FlexContainer_a511bde6387a45228fbce13f4ba27ba1: function AS_FlexContainer_a511bde6387a45228fbce13f4ba27ba1(eventobject) {
        var self = this;
        return self.goToCreationCuurentTransaction.call(this);
    },
    /** onDownloadComplete defined for imgStatistics **/
    AS_Image_f1ca080e583a46729ee488100108d6b8: function AS_Image_f1ca080e583a46729ee488100108d6b8(eventobject, imagesrc, issuccess) {
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
    /** onDownloadComplete defined for imgSettings **/
    AS_Image_cdfd0cd2849947a88bd355d3a3a41864: function AS_Image_cdfd0cd2849947a88bd355d3a3a41864(eventobject, imagesrc, issuccess) {
        var self = this;
    },
    /** onTouchEnd defined for btnSettings **/
    AS_Button_b2250ed362804eb791f0032738f080c6: function AS_Button_b2250ed362804eb791f0032738f080c6(eventobject, x, y) {
        var self = this;
        return self.goToSettings.call(this);
    },
    /** onClick defined for btnHideMenu **/
    AS_Button_b6f3601e45bb4dbda75c1e7834e11d7a: function AS_Button_b6f3601e45bb4dbda75c1e7834e11d7a(eventobject) {
        var self = this;
        return self.hideMenu.call(this);
    },
    /** onTouchStart defined for flxHideMenu **/
    AS_FlexContainer_bb6c0aa400e14c21a3a4eefbe2d6bc88: function AS_FlexContainer_bb6c0aa400e14c21a3a4eefbe2d6bc88(eventobject, x, y) {
        var self = this;
    },
    /** preShow defined for frmCategoriesList **/
    AS_Form_ee877c39514d4bbc9c47de5d059486d7: function AS_Form_ee877c39514d4bbc9c47de5d059486d7(eventobject) {
        var self = this;
        self.initIncomeCategoriesList.call(this);
        self.initCurrentCategoriesList.call(this);
        self.initExpensesCategoriesList.call(this);
        self.hideMenu.call(this);
        self.calculateIncomeBalance.call(this);
        self.calculateCurrentBalance.call(this);
        self.calculateExpensesBalance.call(this);
        initCurrencies.call(this);
        self.onInit.call(this);
    },
    /** postShow defined for frmCategoriesList **/
    AS_Form_e4eb6432977f446fb17b17b488f1bf50: function AS_Form_e4eb6432977f446fb17b17b488f1bf50(eventobject) {
        var self = this;
    }
});