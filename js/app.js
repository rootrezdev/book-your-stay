define(['jquery', 'text!template/form.html', 
                'text!style/widget.css', 
                'text!style/cleanslate.css', 
                'text!style/daterangepicker/picker.css'
        ], function ($, formHtml, widgetcss, cleanslatecss, pickercss) {
    'use strict';

    // private variables here...
	  var settings, $form;
	
    var app = {
        init: function (config) {
             // get the settings and make them available through the app
            settings = config;

            var $widgetStyle = $("<style></style>", {type: "text/css"});
            $widgetStyle.text(widgetcss);
            $("head").append($widgetStyle);

            var $cleanslateStyle = $("<style></style>", {type: "text/css"});
            $cleanslateStyle.text(cleanslatecss);
            $("head").append($cleanslateStyle);

            var $pickerStyle = $("<style></style>", {type: "text/css"});
            $pickerStyle.text(pickercss);
            $("head").append($pickerStyle);

            $('#RootRezWidget').append(formHtml); 
            // get a reference of the form after is inserted
            $form = $('#widget-form');
            // call initialization methods
            initializeEvents();
        }
    };

    // example initialization 
    function initializeEvents() {
        // here I have used the $form pointer to initialize the events on the form
        $('#datepicker').dateRangePicker({
            startDate: '2019-08-10',
		    endDate: '2019-09-10'
        });
    }

    return app;
});