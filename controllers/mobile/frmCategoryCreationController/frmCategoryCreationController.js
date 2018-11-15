define({ 

    navToIcons: function() {
        navToForm('frmIcons');
    },

    navToCategories: function() {
        navToForm('frmCategories');
    },

    onNavigate: function(context) {
        let imgAddIcon = this.view.imgAddIcon;
        imgAddIcon.src = context || 'image.png';
        if(imgAddIcon.src !== 'image.png') {
            imgAddIcon.height = '80dp';
            imgAddIcon.width = '80dp';
        } else {
            imgAddIcon.height = '70%';
            imgAddIcon.width = '70%';
        }
    },

    addCategory: function() {
        let categoryName = this.view.txbInputCategoryName.text;
        let categoryIcon = this.view.imgAddIcon.src;

        if(categoryName && categoryIcon !== 'image.png') {
            let newCategory = {
                id: Date.now(),
                icon: categoryIcon,
                name: categoryName,
                user_id: CURRENT_USER 
            };
            serviceCategory.create(newCategory);

            kony.ui.Alert({message: `${newCategory.id} ${newCategory.name} ${newCategory.icon}`}, {});

        } else {
            kony.ui.Alert({message: 'Please fill out all fields!'}, {});
        }

    },

    clearInputs: function() {
        this.view.txbInputCategoryName.text = "";
    }
});