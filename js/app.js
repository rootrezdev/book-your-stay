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
            $form = $('#rootrez-widget-form');
            // call initialization methods
            initializeEvents(settings);
        }
    };

    // event initialization 
    function initializeEvents(settings) {
        if(settings.default_checkin != "") {
            $('#Checkin').val(settings.default_checkin);
            var default_checkin = new Date(settings.default_checkin);
            var default_checkout = new Date(settings.default_checkin);
            default_checkout.setDate(default_checkin.getDate()+1);
            var checkout_dd = default_checkout.getDate();
            var checkout_mm = default_checkout.getMonth()+1;
            var checkout_yyyy = default_checkout.getFullYear();
            if(checkout_dd < 10) 
            {
                checkout_dd = '0' + checkout_dd;
            } 

            if(checkout_mm < 10) 
            {
                checkout_mm = '0' + checkout_mm;
            } 
            var checkout_date  = checkout_yyyy + "-" + checkout_mm + "-" + checkout_dd;
            $('#Checkout').val(checkout_date);
            $('#rootrez_daterangepicker').text(settings.default_checkin + ' to ' + checkout_date);
        }

        if(settings.min_checkin == ""){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd < 10) 
            {
                dd = '0' + dd;
            } 

            if(mm < 10) 
            {
                mm = '0' + mm;
            } 
            var today_date  = yyyy + "-" + mm + "-" + dd;
            settings.min_checkin = today_date;
        }
        
        // here I have used the $form pointer to initialize the events on the form
        $('#rootrez-widget-form #rootrez_daterangepicker').dateRangePicker({
            startDate: settings.min_checkin,
            endDate: settings.max_checkout,
            minDays: 2,
            maxDays: 28,
            getValue: function()
            {
                if ($('#Checkin').val() && $('#Checkout').val() )
                    return $('#Checkin').val() + ' to ' + $('#Checkout').val();
                else
                    return '';
            },
            setValue: function(s,s1,s2)
            {
                $('#Checkin').val(s1);
                $('#Checkout').val(s2);
                this.innerHTML = s1 + ' to ' + s2;
            }
            
        });

        if(settings.submission_url != "") {
            $("#rootrez-widget-form").attr('action', settings.submission_url);
        } else {
            $('#rootrez-widget-form button[type="submit"]').attr('disabled','disabled');
        }
    }

    return app;
});