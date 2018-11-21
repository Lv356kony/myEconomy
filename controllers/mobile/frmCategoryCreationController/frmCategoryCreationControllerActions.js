define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxCreateCategoryBack **/
    AS_FlexContainer_e587e62b6bcd4b82af13757c9216c606: function AS_FlexContainer_e587e62b6bcd4b82af13757c9216c606(eventobject) {
        var self = this;
        return self.navToCategories.call(this);
    },
    /** onClick defined for flxIconButton **/
    AS_FlexContainer_b83040e748544969a6e9c1467ca97831: function AS_FlexContainer_b83040e748544969a6e9c1467ca97831(eventobject) {
        var self = this;
        return self.navToIcons.call(this);
    },
    /** onClick defined for btnAddNewCategory **/
    AS_Button_baf021471cb8410f823232645020d1a5: function AS_Button_baf021471cb8410f823232645020d1a5(eventobject) {
        var self = this;
        return self.addCategory.call(this);
    },
    /** onTouchStart defined for lblCurrency **/
    AS_Label_d1870577a5294aaebf4d0df9ef314bf1: function AS_Label_d1870577a5294aaebf4d0df9ef314bf1(eventobject, x, y) {
        var self = this;
    },
    /** init defined for frmCategoryCreation **/
    AS_Form_d6a67e65b8994d80b0700694f66936b4: function AS_Form_d6a67e65b8994d80b0700694f66936b4(eventobject) {
        var self = this;
    },
    /** postShow defined for frmCategoryCreation **/
    AS_Form_f224d072d9174afe8790131623878a5d: function AS_Form_f224d072d9174afe8790131623878a5d(eventobject) {
        var self = this;
        return self.init.call(this);
    }
});