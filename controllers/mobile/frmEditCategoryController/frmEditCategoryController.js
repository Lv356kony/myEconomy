define({ 
	
    onNavigate: function(context) {
        alert(context.categoryId);
    },
    
    goToHistory: function() {
        navToForm('frmHistory');
    }

 });