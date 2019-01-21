$(document).ready(function() {
    $('.photo').magnificPopup({
        type: 'image',  
        gallery : {
            enabled: true  // set to true to enable gallery
        },
        // preload: [0,2], // read about this option in next Lazy-loading section
        removalDelay: 300,  // Delay in milliseconds before popup is removed

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade'

    });







});

