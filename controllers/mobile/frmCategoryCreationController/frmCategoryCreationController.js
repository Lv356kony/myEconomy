define({ 

    navToIcons: function() {
        navToForm('frmIcons');
    },

    navToCategories: function() {
        navToForm('frmCategories');
    },

    showPopUp: function() {
        this.view.flxPopUpIconsCopy.isVisible = true;
        this.view.flxHideOpasity.isVisible = true;
    },

    hidePopUp: function() {
        this.view.flxPopUpIconsCopy.isVisible = false;
        this.view.flxHideOpasity.isVisible = false;
    },

    addCategory: function() {
        let categoryName = this.view.txbInputCategoryName.text;
        let categoryIcon = this.view.imgAddIcon.src;

        if(categoryName && categoryIcon) {
            let newCategory = {
                id: Date.now(),
                icon: categoryIcon,
                name: categoryName,
                //         type: , 
                user_id: CURRENT_USER 
            };

            serviceCategory.create(newCategory);

            kony.ui.Alert({
                message: newCategory.id + ' ' + newCategory.name + ' ' + newCategory.icon
            }, {});
        } else {
            kony.ui.Alert({
                message: 'Please enter category name!'
            }, {});
        }

    },

    generatePreview: function() {
        this.view.txbInputCategoryName.text = "";

        iconsList = ['bank.png', 'cash.png', 'cinema.png', 'cocktail.png', 
            		'creditcard.png', 'diamond.png', 'dollar.png', 'euro.png',
            		'food.png', 'gamecontroller.png', 'gold.png', 'hollidays.png',
                    'karaoke.png', 'money_graph.png', 'bank.png', 'online_shopping.png',
                    'plane.png', 'purse.png', 'bank.png'];
        let flexIconList = this.view.flxPopUpIcons.flxIconList;
        
        for(let i = 0, h = 0; i < iconsList.length; i++, h +=100) {
            for(let j = 0, w = 0; j < 4; j++, w += 100) {
              
                let flexContainer = new kony.ui.FlexContainer({
                    "id": "flexContainer"+i+j,
                    "top": `${0 + h}dp`,
                    "left": `${0 + w}dp`,
                    "width": "90dp",
                    "height": "90dp",
                    "zIndex": 1,
                    "isVisible": true,
                    "clipBounds": true,
                    "layoutType": kony.flex.FREE_FORM,
                    "skin": "FlexImageIcon"
                }, {
                    "padding": [0, 0, 0, 0]
                }, {});
				
                let basicProperties = {
                    id:"image_"+iconsList[i], 
					isVisible: true, 
					src: iconsList[4*i+j],
                    centerX: "50%",
                    centerY: "50%",
                    height: '70dp',
                    width: '70dp'
                };
                let layoutImage = {
                    padding: [0, 0, 0, 0]
                };
                
                let imageIcon = new kony.ui.Image(basicProperties, layoutImage, {});
               
                flexContainer.setDefaultUnit(kony.flex.DP);
//                 flexContainer.add();
                flexContainer.add(imageIcon);
                flexIconList.add(flexContainer);
            }
            
        }
     
    }
    
 });