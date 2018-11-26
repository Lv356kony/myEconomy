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
    /** onTouchEnd defined for btnDeleteCategory **/
    AS_Button_cf7773ec01584cfea7b5ad3cb8597de6: function AS_Button_cf7773ec01584cfea7b5ad3cb8597de6(eventobject, x, y) {
        var self = this;
        return self.showDeleteOptions.call(this);
    },
    /** onClick defined for btnCancelCategoryDeletion **/
    AS_Button_hb7c584837b5403c8f23f9c0bb722e84: function AS_Button_hb7c584837b5403c8f23f9c0bb722e84(eventobject) {
        var self = this;
        return self.hideDeleteOptions.call(this);
    },
    /** onClick defined for btnDelCatWTransaction **/
    AS_Button_f50dc7af677645abbc43ee3502380106: function AS_Button_f50dc7af677645abbc43ee3502380106(eventobject) {
        var self = this;
        self.showDeleteBtnWith.call(this);
        self.showDeleteConfirmation.call(this);
    },
    /** onClick defined for btnDelCatWOTransaction **/
    AS_Button_hc93b3d2626448299f4b39b2b37b41c5: function AS_Button_hc93b3d2626448299f4b39b2b37b41c5(eventobject) {
        var self = this;
        self.showDeleteBtnWithout.call(this);
        self.showDeleteConfirmation.call(this);
    },
    /** onClick defined for btnWDeleteYes **/
    AS_Button_d9521386c87f4e9ebf57ea2ed8dcf2eb: function AS_Button_d9521386c87f4e9ebf57ea2ed8dcf2eb(eventobject) {
        var self = this;
        return self.deleteWithTransactions.call(this);
    },
    /** onClick defined for btnDeleteNo **/
    AS_Button_gbc64b124b5b4b458fec07940ad72fbd: function AS_Button_gbc64b124b5b4b458fec07940ad72fbd(eventobject) {
        var self = this;
        return self.hideDeleteOptions.call(this);
    },
    /** onClick defined for btnWODeleteYes **/
    AS_Button_ca34fc56ea40449685b471f7afba7510: function AS_Button_ca34fc56ea40449685b471f7afba7510(eventobject) {
        var self = this;
        return self.deleteWithoutTransactions.call(this);
    },
    /** onClick defined for flxDeleteCategoryContainer **/
    AS_FlexContainer_g9907a156b2940c1bece2810b40e0192: function AS_FlexContainer_g9907a156b2940c1bece2810b40e0192(eventobject) {
        var self = this;
        return self.hideDeleteOptions.call(this);
    },
    /** preShow defined for frmHistory **/
    AS_Form_b1b2a209c3ad4e07ba554a971bc82828: function AS_Form_b1b2a209c3ad4e07ba554a971bc82828(eventobject) {
        var self = this;
        self.onPreShow.call(this);
        self.showCategory.call(this);
        self.showExpenses.call(this);
        self.hideDeleteOptions.call(this);
    }
});