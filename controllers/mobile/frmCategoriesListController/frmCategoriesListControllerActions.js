define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxAddIncome **/
    AS_FlexContainer_a37779fefc634a109b9dbe0cd31d4206: function AS_FlexContainer_a37779fefc634a109b9dbe0cd31d4206(eventobject) {
        var self = this;
        return self.setCategoryIncomeType.call(this);
    },
    /** onClick defined for flxAddCurrent **/
    AS_FlexContainer_c0ab460c24d645b49f8ee95460a64e4f: function AS_FlexContainer_c0ab460c24d645b49f8ee95460a64e4f(eventobject) {
        var self = this;
        return self.setCategoryCurrentType.call(this);
    },
    /** onClick defined for flxAddExpenses **/
    AS_FlexContainer_e1f8bac1ba84451a855e2ea89fec8761: function AS_FlexContainer_e1f8bac1ba84451a855e2ea89fec8761(eventobject) {
        var self = this;
        return self.setCategoryExpensesType.call(this);
    },
    /** preShow defined for frmCategoriesList **/
    AS_Form_ee877c39514d4bbc9c47de5d059486d7: function AS_Form_ee877c39514d4bbc9c47de5d059486d7(eventobject) {
        var self = this;
        self.initIncomeCategoriesList.call(this);
        self.initCurrentCategoriesList.call(this);
        self.initExpensesCategoriesList.call(this);
    }
});