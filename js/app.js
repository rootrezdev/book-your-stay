define(['jquery', 'text!resources/template/form.html',
                'text!dist/style.css'

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
        if (settings.title_text && settings.title_text.length) {
            $('#widget-title').text(settings.title_text);
            $('#widget-title-box').show();
        }
        if (settings.tagline_text && settings.tagline_text.length) {
            $('#widget-tagline').text(settings.tagline_text);
            $('#widget-tagline').show();
        }
        if(settings.default_checkin != "") {
            $('#Checkin').val(settings.default_checkin);
        }

        if(settings.default_checkout != "") {
            $('#Checkout').val(settings.default_checkout);
        }

        if(settings.default_checkin != "" && settings.default_checkout == "") {
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
            var checkout_date  = checkout_mm + "/" + checkout_dd + "/" + checkout_yyyy;
            $('#Checkout').val(checkout_date);
            settings.default_checkout = checkout_date;
        }

        if(settings.default_checkin != "" && settings.default_checkout != "") {
            var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var defaultCheckin = new Date(settings.default_checkin);
            var defaultCheckout = new Date(settings.default_checkout);
            $('#rootrez_daterangepicker').html(monthArr[defaultCheckin.getMonth()] + ' ' + defaultCheckin.getDate() + ', ' + defaultCheckin.getFullYear()
                                        + ' &rarr; ' + monthArr[defaultCheckout.getMonth()] + ' ' + defaultCheckout.getDate() + ', ' + defaultCheckout.getFullYear() );
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
            var today_date  = mm + "/" + dd + "/" + yyyy;
            settings.min_checkin = today_date;
        }

        if(settings.max_checkout == ""){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            if(dd < 10)
            {
                dd = '0' + dd;
            }
            if(mm < 10)
            {
                mm = '0' + mm;
            }
            var yyyy = today.getFullYear()+2;
            var today_date  = mm + "/" + dd + "/" + yyyy;
            settings.max_checkout = today_date;
        }

        var dpSettings = {
            "minDate": settings.min_checkin,
            "maxDate": settings.max_checkout,
            "dateLimit":{
                "days": 28
            },
            "applyClass": '',
            "cancelClass": '',
            "buttonClasses": ''
        };

        $('#rootrez-widget-form #rootrez_daterangepicker').daterangepicker(dpSettings, function(start, end){
            $('#rootrez_daterangepicker').html(start.format('MMM D, YYYY') + ' &rarr; ' + end.format('MMM D, YYYY'));
            $('#Checkin').val(start.format('MM/DD/YYYY'));
            $('#Checkout').val(end.format('MM/DD/YYYY'));

            $.ajax({
                type:"GET",
                cache:false,
                url:settings.api_url+"/publisher/v3.0/discounts/all.json",
                data:{ checkin : start.format('MM/DD/YYYY'), checkout : end.format('MM/DD/YYYY'), key: settings.publisher_key },
                success: function (response) {
                    buildDropdown(response,$('#PromoCode'),'Select Offer');
                }
              });
        });

        if(settings.submission_url != "") {
            $("#rootrez-widget-form").attr('action', settings.submission_url);
        } else {
            $('#rootrez-widget-form button[type="submit"]').attr('disabled','disabled');
        }
    }

    function buildDropdown(result, dropdown, emptyMessage)
    {
        // Remove current options
        dropdown.html('');
        // Add the empty option with the empty message
        dropdown.append('<option value="">' + emptyMessage + '</option>');
        // Check result isnt empty
        if("data" in result && result.data.length > 0)
        {
            // Loop through each of the results and append the option to the dropdown
            $.each(result.data, function(k, v) {
                //console.log(v);
                dropdown.append('<option value="' + v.code + '">' + v.display_string + ' - ' + v.code + '</option>');
            });
            $('#PromoCode').addClass('show');
            $('#PromoCode').removeClass('hide');
        } else {
            $('#PromoCode').addClass('hide');
            $('#PromoCode').removeClass('show');
        }
    }

    return app;
});
