require(["jquery", "js/app", "moment", "daterangepicker"], function($, app, moment, daterangepicker){
    'use strict';
     var config = {
        min_checkin : $('script[id="rootrezScript"]').data("min_checkin"),
        max_checkout : $('script[id="rootrezScript"]').data("max_checkout"),
        default_checkin : $('script[id="rootrezScript"]').data("default_checkin"),
        submission_url : $('script[id="rootrezScript"]').data("submission_url"),
     };
     $(function() {
        app.init(config);
     });
 });