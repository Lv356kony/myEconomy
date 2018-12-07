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
    /** onSelection defined for lstBoxTo **/
    AS_ListBox_b942ddd2f6234218a1c6a9b57535cfbc: function AS_ListBox_b942ddd2f6234218a1c6a9b57535cfbc(eventobject) {
        var self = this;
        return self.changeIconOnSelect.call(this);
    },
    /** onClick defined for btnUpdate **/
    AS_Button_f5e19543b750464dafb06db05946f550: function AS_Button_f5e19543b750464dafb06db05946f550(eventobject) {
        var self = this;
        return self.updateTransaction.call(this);
    },
    /** onClick defined for btnCloseEditWindow **/
    AS_Button_b881594b51264cb199931eb56dfb87f3: function AS_Button_b881594b51264cb199931eb56dfb87f3(eventobject) {
        var self = this;
        self.hideEditForm.call(this);
        self.hideDeleteConfirmationWindow.call(this);
    },
    /** onClick defined for btnDeleteTransaction **/
    AS_Button_c5b46f95a33348a8955f04fb0fa8b004: function AS_Button_c5b46f95a33348a8955f04fb0fa8b004(eventobject) {
        var self = this;
        return self.showDeleteConfirmationWindow.call(this);
    },
    /** onClick defined for btnEditTransaction **/
    AS_Button_c69f362705f7434b808304f25117f6f4: function AS_Button_c69f362705f7434b808304f25117f6f4(eventobject) {
        var self = this;
        return self.showEdit.call(this);
    },
    /** onDownloadComplete defined for imgShowCategory **/
    AS_Image_cd137c61a9014117be72dc4860250391: function AS_Image_cd137c61a9014117be72dc4860250391(eventobject, imagesrc, issuccess) {
        var self = this;
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
        return self.showDetails.call(this);
    },
    /** onClick defined for btnDeleteYes **/
    AS_Button_a512088465b649ffa381babbad070902: function AS_Button_a512088465b649ffa381babbad070902(eventobject) {
        var self = this;
        self.deleteTransaction.call(this);
        self.hideDeleteConfirmationWindow.call(this);
    },
    /** onClick defined for btnDeleteNo **/
    AS_Button_adaf1cde98f044669022358c664148f4: function AS_Button_adaf1cde98f044669022358c664148f4(eventobject) {
        var self = this;
        return self.hideDeleteConfirmationWindow.call(this);
    },
    /** onTouchEnd defined for flxDeleteConfirm **/
    AS_FlexContainer_c96363e9db8c45128d25a0ea475d8c27: function AS_FlexContainer_c96363e9db8c45128d25a0ea475d8c27(eventobject, x, y) {
        var self = this;
        return self.hideDeleteConfirmationWindow.call(this);
    },
    /** preShow defined for frmHistoryDetails **/
    AS_Form_j19b08eaddab407eb7afe8ff122c3956: function AS_Form_j19b08eaddab407eb7afe8ff122c3956(eventobject) {
        var self = this;
        self.showDetails.call(this);
        self.closeEditFormOnLoad.call(this);
        self.clearInputs.call(this);
    }
});