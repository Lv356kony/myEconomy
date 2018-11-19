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
    }
});