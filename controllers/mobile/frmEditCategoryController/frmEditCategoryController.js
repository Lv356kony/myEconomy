define({ 
    
    onNavigate: function(category) {
        this.categoryId = category.categoryId;
    },
    
    goToHistory: function() {
        navToForm('frmHistory', {categoryId: this.categoryId});
    },
    
    onPreShow: function() {
        this.showDefaultValues(this.categoryId);
    },
    
    showDefaultValues: function(id) {
        let category = serviceCategory.getById(id);
        this.view.imgEditCategoryIcon.src = category.icon;
        this.view.lblEditCategoryType.text = category.type;
        this.view.lblEditCategoryCurrency.text = category.currency;
        let creator = '';
		this.view.txbEditCategoryName.text = category.name;
    },
    
    editCategory: function() {
        const name = this.view.txbEditCategoryName.text;
        alert(name);
//         let updateCategory 
//         serviceCategory.updateById(this.categoryId, )
        
// 		let sharedUserEmail = this.view.txbEditCategoryShare.text;
//      serviceCategory.shareCategory(this.categotyId, );
    }

    
    
 });