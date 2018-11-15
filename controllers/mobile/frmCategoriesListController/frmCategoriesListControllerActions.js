define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segmIncome **/
    AS_Segment_b5841b0ab0f442209d15bdb5c840d8eb: function AS_Segment_b5841b0ab0f442209d15bdb5c840d8eb(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject, sectionNumber, rowNumber);
    },
    /** onRowClick defined for segmCurrent **/
    AS_Segment_cd1813046cc74b939f7c6de679ebf49a: function AS_Segment_cd1813046cc74b939f7c6de679ebf49a(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject);
    },
    /** onRowClick defined for segmExpenses **/
    AS_Segment_f353746986dd4760aa4632d92f13dc00: function AS_Segment_f353746986dd4760aa4632d92f13dc00(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.goToHistory.call(this, eventobject, sectionNumber, rowNumber, null);
    },
    /** preShow defined for frmCategoriesList **/
    AS_Form_ee877c39514d4bbc9c47de5d059486d7: function AS_Form_ee877c39514d4bbc9c47de5d059486d7(eventobject) {
        var self = this;
        self.initIncomeCategoriesList.call(this);
        self.initCurrentCategoriesList.call(this);
        self.initExpensesCategoriesList.call(this);
    }
});