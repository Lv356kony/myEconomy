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
  
  chooseIcon: function() {
    let icon1 = this.view.imgIcon1.src;
    kony.ui.Alert({message: icon1}, {});
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
  
  clearTextbox: function() {
    this.view.txbInputCategoryName.text = "";
//     add widgets 
    this.view.flxPopUpIconsCopy.flxIconList.add(widgetArray);
  }

 });