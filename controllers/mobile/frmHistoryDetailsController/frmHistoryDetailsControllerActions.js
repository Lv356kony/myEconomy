define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segDetails **/
    AS_Segment_g0cdb3c6e2b04aea9866bbd24b543231: function AS_Segment_g0cdb3c6e2b04aea9866bbd24b543231(eventobject, sectionNumber, rowNumber) {
        var self = this;
        self.setEditDefaultValues.call(this);
        self.showEditForm.call(this);
    },
    /** onTouchEnd defined for btnDetailsBack **/
    AS_Button_i9b38427fa1b41a0ac16934ab905b37a: function AS_Button_i9b38427fa1b41a0ac16934ab905b37a(eventobject, x, y) {
        var self = this;
        return self.goToHistory.call(this);
    },
    /** onTouchStart defined for flxDetailsBackButton **/
    AS_FlexContainer_hd01368d98b441a29b9ae8720b5eef0e: function AS_FlexContainer_hd01368d98b441a29b9ae8720b5eef0e(eventobject, x, y) {
        var self = this;
    },
    /** onClick defined for btnDetailsSearch **/
    AS_Button_ea82bc2cf707429ca6f63ebb6c1979fc: function AS_Button_ea82bc2cf707429ca6f63ebb6c1979fc(eventobject) {
        var self = this;
        return navToForm.call(this, null, null);
    },
    /** onClick defined for btnUpdate **/
    AS_Button_ba85ec7c201c460ea834195fd1867d5f: function AS_Button_ba85ec7c201c460ea834195fd1867d5f(eventobject) {
        var self = this;
        self.updateTransaction.call(this);
        self.refresh.call(this);
    },
    /** onClick defined for btnCloseEditWindow **/
    AS_Button_d1bd676d8b4e4543b61294e8268971ed: function AS_Button_d1bd676d8b4e4543b61294e8268971ed(eventobject) {
        var self = this;
        self.hideEditForm.call(this);
        self.hideDeleteConfirmationWindow.call(this);
        self.clearInputs.call(this);
    },
    /** onClick defined for btnDeleteTransaction **/
    AS_Button_a9af04dd59b14e65a83804676bc4f141: function AS_Button_a9af04dd59b14e65a83804676bc4f141(eventobject) {
        var self = this;
        return self.showDeleteConfirmationWindow.call(this);
    },
    /** onClick defined for btnEditTransaction **/
    AS_Button_ff7dfbed36354735a504dee5f2487b95: function AS_Button_ff7dfbed36354735a504dee5f2487b95(eventobject) {
        var self = this;
        return self.showEdit.call(this);
    },
    /** onDownloadComplete defined for imgShowCategory **/
    AS_Image_h562a90f98e941549067d9cd836f533b: function AS_Image_h562a90f98e941549067d9cd836f533b(eventobject, imagesrc, issuccess) {
        var self = this;
    },
    /** preShow defined for frmHistoryDetails **/
    AS_Form_j19b08eaddab407eb7afe8ff122c3956: function AS_Form_j19b08eaddab407eb7afe8ff122c3956(eventobject) {
        var self = this;
        self.showDetails.call(this);
        self.loadCategories.call(this, 'Expenses', 'lstBoxTo');
        self.loadCategories.call(this, 'Current', 'lstBoxFrom');
        self.hideEditForm.call(this);
        self.clearInputs.call(this);
    },
    /** onClick defined for btnDeleteNo **/
    AS_Button_j28f9393294e43b18971095b1c9c39d7: function AS_Button_j28f9393294e43b18971095b1c9c39d7(eventobject) {
        var self = this;
        return self.hideDeleteConfirmationWindow.call(this);
    },
    /** onClick defined for btnDeleteYes **/
    AS_Button_b616367341d94930b8c25e233629ab1a: function AS_Button_b616367341d94930b8c25e233629ab1a(eventobject) {
        var self = this;
        self.deleteTransaction.call(this);
        self.hideDeleteConfirmationWindow.call(this);
        self.refresh.call(this);
    }
});