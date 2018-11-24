define({ 

    navToIcons: function() {
        navToForm('frmIcons');
    },

    navToCategories: function() {
        navToForm('frmCategoriesList');
    },

    onNavigate: function(context) {

        if(context){
            if(context.categoryType) {
                this.view.lblCreateCategoryHeader.text =  "Create new " + context.categoryType.toLowerCase();
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
        let categoryCurrency =  this.view.lstCurrency.selectedKeyValue[1];

        if(categoryName) {
            let newCategory = {
                id: parseInt(Date.now()), 
                icon: categoryIcon,
                name: categoryName,
                type: this.type,
                user_id: CURRENT_USER.id,
                currency: categoryCurrency 
            };

            serviceCategory.create(newCategory);
            navToForm('frmCategoriesList');

        } else {
            kony.ui.Alert({message: 'Please enter category name'}, {});
        }
    },

    init: function () {
        this.setListBoxData();
    },

    setListBoxData:function(){
        let data = CURRENCIES.map((item,index)=>{ 
            return [index,item];});
        this.view.lstCurrency.masterData = data;  
    }






}); 