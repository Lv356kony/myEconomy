define({ 
    onNavigate: function(context) {
        this.categoryId = context.categoryId;
        this.context = context;
    },
    
    goToHistory: function() {
        navToForm('frmHistory', {categoryId: this.categoryId});
        this.view.txbEditCategoryShare.text = '';
        this.view.lblEditCategoryCreator.text = '';
    },
    
    goToIcons: function() {
        navToForm('frmIcons', {categoryId: this.categoryId});
    },
    
    refresh: function(){
        navToForm("frmEditCategory", {categoryId: this.categoryId});
        this.view.txbEditCategoryShare.text = '';
        this.view.lblEditCategoryCreator.text = '';
    },
    
    onPreShow: function() {
        this.showDefaultValues(this.categoryId);
        let category = serviceCategoryRefactored.getById(this.categoryId);
        if(category.type === CATEGORY_TYPES.INCOME) {
            this.hideSharedField();
        } else {
            this.showSharedField();
        }
    },
    
    showDefaultValues: function(id) {
        let category = serviceCategoryRefactored.getById(id);
        this.view.imgEditCategoryIcon.src = this.context.chosenIconSrc || category.icon;
        this.view.lblEditCategoryType.text = category.type;
        this.view.lblEditCategoryCurrency.text = category.currency;
		this.view.txbEditCategoryName.text = category.name;
    },
    
    editCategory: function() {
        const iconSrc = this.view.imgEditCategoryIcon.src;
        const name = this.view.txbEditCategoryName.text;
        const sharedUserEmail = this.view.txbEditCategoryShare.text;
		let editedCategory = {
            name: name,
            icon: iconSrc
        };
        if(sharedUserEmail) {
            const sharedUser = userServiceRefactored.getByEmail(sharedUserEmail);
            if(sharedUser) {
                serviceCategoryRefactored.shareCategory(this.categoryId, sharedUser.id);
                this.view.lblEditCategoryCreator.text = `Shared with: ${sharedUser.firstName}`;
            } else {
                alert('User with this email doesn`t exist.');
                return;
            }
        }
        serviceCategoryRefactored.updateById(this.categoryId, editedCategory);
        this.refresh();
        this.goToHistory();
    },
    
    hideSharedField: function() {
        this.view.flxEditCategoryShare.top = '-100dp';
        this.view.flxEditCategoryName.centerY = '50%';
    },
    showSharedField: function() {
        this.view.flxEditCategoryShare.top = '120dp';
        this.view.flxEditCategoryName.top = '10dp';
        this.view.flxEditCategoryName.centerY = 'default';
    }
 });