define({ 
  goToHistory: function(){
    alert(userService.getById(1));
    this.view.flxSideMenuContainer.left = '-100%';
    navToForm("frmHistory");
  },
  showMenu: function(){
    this.view.flxSideMenuContainer.left = '0%';
  },
  hideMenu: function(){
    this.view.flxSideMenuContainer.left = '-100%';
  }
});