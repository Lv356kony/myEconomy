define({ 

    navToIcons: function() {
        navToForm('frmIcons');
    },

    navToCategories: function() {
        navToForm('frmCategoriesList');
    },
    
    preShowIcon: function() {
        this.view.imgAddIcon.src = 'image.png';
    },

    onNavigate: function(context) {

        if(context){
            if(context.categoryType) {
                this.type = context.categoryType;
                this.view.txbInputCategoryName.text = "";
                this.view.imgAddIcon.src = 'image.png';
            }
            
            if(context.chosenIconSrc) {
                let imgAddIcon = this.view.imgAddIcon;
                imgAddIcon.src = context.chosenIconSrc || 'image.png';
                
                if(imgAddIcon.src !== 'image.png') {
                    imgAddIcon.height = '80dp';
                    imgAddIcon.width = '80dp';
                }
            }    
        }
    },

    addCategory: function() {
        let categoryName = this.view.txbInputCategoryName.text;
        let categoryIcon = this.view.imgAddIcon.src;

        if(categoryName) {
            let newCategory = {
                id: Date.now(),
                icon: categoryIcon,
                name: categoryName,
                type: this.type,
                user_id: CURRENT_USER 
            };
            
            serviceCategory.create(newCategory);
			navToForm('frmCategoriesList');
            
        } else {
            kony.ui.Alert({message: 'Please enter category name'}, {});
        }
    }

});