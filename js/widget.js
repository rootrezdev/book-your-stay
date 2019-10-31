require(["jquery", "js/app", "moment", "daterangepicker"], function($, app, moment, daterangepicker){
    'use strict';


    var default_checkin = $('script[id="rootrezScript"]').data("default_checkin") == undefined ? '' : $('script[id="rootrezScript"]').data("default_checkin");
    var default_checkout = $('script[id="rootrezScript"]').data("default_checkout") == undefined ? '' : $('script[id="rootrezScript"]').data("default_checkout");

     var config = {
        min_checkin : $('script[id="rootrezScript"]').data("min_checkin"),
        max_checkout : $('script[id="rootrezScript"]').data("max_checkout"),
        default_checkin : default_checkin,
        default_checkout : default_checkout,
        submission_url : $('script[id="rootrezScript"]').data("submission_url"),
        publisher_key : $('script[id="rootrezScript"]').data("publisher_key"),
        api_url : $('script[id="rootrezScript"]').data("api_url"),
     };
     $(function() {
        app.init(config);
     });
 });