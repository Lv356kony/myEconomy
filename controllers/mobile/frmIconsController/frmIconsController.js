define({ 
    onNavigate: function(context) {
        this.context = context;
        if(context) {
            if(context.categoryId) {
                this.categoryId = context.categoryId;
            }
        }
    },
    
    backToCategotyCreation: function() {
        let target = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        target.navigate({
            categoryId: this.categoryId,
            chosenIconSrc: null

        });
    },
    
    generatePreview: function() {
        let categoryId = this.categoryId;
        const iconsList = ['bank.png', 'home.png', 'cash.png','currency.png', 
                           'cocktail.png', 'visa_icon.png', 'mastercard.png', 'deposit.png',
                           'creditcard.png', 'car.png', 'dollar.png', 'euro.png',
                           'food.png', 'gamecontroller.png', 'gold.png', 'hollidays.png',
                           'cinema.png', 'money_graph.png', 'money_increase.png', 'online_shopping.png',
                           'plane.png', 'purse.png', 'scooter.png','theatre.png', 
                           'luggage.png', 'savings.png', 'gift.png', 'bill.png'];
        
        function getIconSrc(eventobject) {
            let chosenIconSrc = eventobject.src;
            let target = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
			target.navigate({
                categoryId: categoryId,
            	chosenIconSrc: chosenIconSrc
            });
        }
        
        let flexIconList = this.view.flxPopUpIcons.flxIconsList;
		
        for(let i = 0, h = 0; i < iconsList.length; i++, h += 100) {
            for(let j = 0, w = 0; j < 4; j++, w += 100) {
				
                let basicPropertiesFlex = {
                    id: 'flexContainer' + i + j,
                    top: `${0 + h}dp`,
                    left: `${0 + w}dp`,
                    width: '100dp',
                    height: '100dp',
                    zIndex: 1,
                    isVisible: true,
                    clipBounds: true,
                    layoutType: kony.flex.FREE_FORM,
                    skin: 'FlexImageIcon'
                };
                
                let layoutFlex = {
                    padding: [0, 0, 0, 0]
                };

                let basicPropertiesImage = {
                    id:"image_" + i+j, 
                    isVisible: true, 
                    src: iconsList[4*i+j],
                    centerX: "50%",
                    centerY: "50%",
                    height: '70dp',
                    width: '70dp',
                    onTouchEnd: getIconSrc
                };
                
                let layoutImage = {
                    padding: [0, 0, 0, 0],
                    imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO
                };
                
                let flexContainer = new kony.ui.FlexContainer(basicPropertiesFlex, layoutFlex, {});
                let imageIcon = new kony.ui.Image2(basicPropertiesImage, layoutImage, {});
				
                flexContainer.setDefaultUnit(kony.flex.DP);
                flexContainer.add(imageIcon);
                flexIconList.add(flexContainer);
            }
        }
    }
    
 });