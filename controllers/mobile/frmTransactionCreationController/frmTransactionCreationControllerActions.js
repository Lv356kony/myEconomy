define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxHeaderBackward **/
    AS_FlexContainer_hac91931d2c048e58688aee90fdc273c: function AS_FlexContainer_hac91931d2c048e58688aee90fdc273c(eventobject) {
        var self = this;
        return self.clickBackwardButton.call(this);
    },
    /** onTextChange defined for txbTransactionAmount **/
    AS_TextField_da66599987d84693a30f15a9d2344dc9: function AS_TextField_da66599987d84693a30f15a9d2344dc9(eventobject, changedtext) {
        var self = this;
        return self.hideErrorMasage.call(this);
    },
    /** onClick defined for btnTransactionSave **/
    AS_Button_e6fff834335e46e79a67fbcbe4f02abc: function AS_Button_e6fff834335e46e79a67fbcbe4f02abc(eventobject) {
        var self = this;
        return self.clickSaveButton.call(this);
    },
    /** postShow defined for frmTransactionCreation **/
    AS_Form_b3c27e22f90343f3ae48febf44f9a91b: function AS_Form_b3c27e22f90343f3ae48febf44f9a91b(eventobject) {
        var self = this;
        return self.init.call(this);
    }
});