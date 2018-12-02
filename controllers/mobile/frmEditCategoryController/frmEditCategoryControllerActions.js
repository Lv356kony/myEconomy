define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxEditCategoryBack **/
    AS_FlexContainer_i8cf0ff9039f4c7794a86049797b7d0b: function AS_FlexContainer_i8cf0ff9039f4c7794a86049797b7d0b(eventobject) {
        var self = this;
        return self.goToHistory.call(this);
    },
    /** onClick defined for flxEditIcon **/
    AS_FlexContainer_bc228e8bff524179862223ccb88bc7ab: function AS_FlexContainer_bc228e8bff524179862223ccb88bc7ab(eventobject) {
        var self = this;
        return self.goToIcons.call(this);
    },
    /** onClick defined for btnEditCategory **/
    AS_Button_faa4678a7b834b3d96a70461b3d97f5b: function AS_Button_faa4678a7b834b3d96a70461b3d97f5b(eventobject) {
        var self = this;
        return self.editCategory.call(this);
    },
    /** preShow defined for frmEditCategory **/
    AS_Form_i8b9ab6c68474d199af1335dd3d17981: function AS_Form_i8b9ab6c68474d199af1335dd3d17981(eventobject) {
        var self = this;
        return self.onPreShow.call(this);
    }
});