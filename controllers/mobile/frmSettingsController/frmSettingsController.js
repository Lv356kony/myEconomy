define({ 
    
    init: function () {
        this.setDataForCurrency();
    },
    
    clickBackwardButton: function () {
        navToForm("frmCategoriesList");
    },

//     openFile: function (){
//         var config = {
//             selectMultipleFiles: true,
//             filter: ["image/png", "image/jpeg"]
//         };
//         var selectedFileCallback = function(event, filelist) {
//           //logic to iterate filelist
//         };
//        //kony.io.FileSystem.browse(config, selectedFileCallback);
//         var querycontext = {mimetype:"image/*"};
//         kony.phone.openMediaGallery(selectedFileCallback, querycontext);
//     },
    
    setDataForCurrency: function () {
        let currency = this.view.lstCurrency;
        let data = CURRENCY.map((element, i) => {
            return [i, element];
        });
        currency.masterData = data;
        currency.selectedKey = data[0][0];
    },
    
    seveSettings: function () {
        let firstName = this.view.txbFirstName.text;
        let lastName = this.view.txbLastName.text;
        let currency = this.view.lstCurrency.selectedKeyValue[1];
    },
    
    verficationOldPasswoed () {
        if (this.view.txbOldPassword1 === )
    }
    

 });