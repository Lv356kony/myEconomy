define({ 
    onNavigate: function(context) {
        this.categoryId = context.categoryId;
        this.context = context;
    },
    
    goToHistory: function() {
        navToForm('frmHistory', {categoryId: this.categoryId});
    },
    
    goToIcons: function() {
        navToForm('frmIcons', {categoryId: this.categoryId});
    },
    
    refresh: function(){
        navToForm("frmEditCategory", {categoryId: this.categoryId});
        this.view.txbEditCategoryShare.text = '';
    },
    
    onPreShow: function() {
        this.showDefaultValues(this.categoryId);
        let category = serviceCategoryRefactored.getById(this.categoryId);
        if(category.type === CATEGORY_TYPES.INCOME) {
            this.hideSharedField();
        }
        if(category.sharedUsers_id.indexOf(id => CURRENT_USER.id === id) !== -1) {
            let creator = userServiceRefactored.getById(CURRENT_USER).firstName;
            this.view.lblEditCategoryCreator.text = `Creator: ${creator}`;
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
            }
        }
        serviceCategoryRefactored.updateById(this.categoryId, editedCategory);
        this.refresh();
    },
    
    hideSharedField: function() {
        this.view.flxEditCategoryShare.top = '-100dp';
        this.view.flxEditCategoryName.centerY = '50%';
    }
 });