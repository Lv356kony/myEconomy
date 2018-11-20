define({ 

    openFile: function (){
        var config = {
            selectMultipleFiles: true,
            filter: ["image/png", "image/jpeg"]
        };
        var selectedFileCallback = function(event, filelist) {
          //logic to iterate filelist
        };
       //kony.io.FileSystem.browse(config, selectedFileCallback);
        var querycontext = {mimetype:"image/*"};
        kony.phone.openMediaGallery(selectedFileCallback, querycontext);
    }

 });