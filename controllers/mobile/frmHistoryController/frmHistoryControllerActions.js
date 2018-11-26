define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segHistoryExpense **/
    AS_Segment_eceb30fe2d6c47568dd5b0a8c981a3f4: function AS_Segment_eceb30fe2d6c47568dd5b0a8c981a3f4(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistoryDetails.call(this);
    },
    /** onTouchEnd defined for btnHistoryBack **/
    AS_Button_a353f4faa0f0492081a3bcf4e6105ef8: function AS_Button_a353f4faa0f0492081a3bcf4e6105ef8(eventobject, x, y) {
        var self = this;
        return self.goToCategories.call(this);
    },
    /** onTouchStart defined for flxHistoryBackButton **/
    AS_FlexContainer_db38504b27454600bb6b4ecd6c6999c6: function AS_FlexContainer_db38504b27454600bb6b4ecd6c6999c6(eventobject, x, y) {
        var self = this;
    },
    /** onClick defined for btnHistorySearch **/
    AS_Button_dd8d184903ad4771aa5045414a02effe: function AS_Button_dd8d184903ad4771aa5045414a02effe(eventobject) {
        var self = this;
        return self.onPreShow.call(this);
    },
    /** preShow defined for frmHistory **/
    AS_Form_b1b2a209c3ad4e07ba554a971bc82828: function AS_Form_b1b2a209c3ad4e07ba554a971bc82828(eventobject) {
        var self = this;
        self.onPreShow.call(this);
        self.showCategory.call(this);
    }
});