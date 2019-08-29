# Book Your Stay Widget

This a widget publishers and affiliates can setup on their website. Adjust the settings in the sample below and provide the HTML/JavaScript snippet to the client.

## Reference
[Building an embeddable Javascript widget](https://thomassileo.name/blog/2014/03/27/building-an-embeddable-javascript-widget-third-party-javascript/)

Build file to share in third party script:

```text
dist/widget.min.js
```

Files to do any change in widget html or css are the follows:
```text
template/form.html
style/widget.css
```

After any changes in these files, do the build again for creating the widget.min.js file: 
```bash
node_modules/requirejs/bin/r.js -o embed.build.js
```

## Third party widget loading script sample

You can refer the demo/index.html for detail

```text
<script>
    (function (window, document) {
        var loader = function () {

            var default_checkin = "";
            var min_checkin = "2019-08-28"; 
            var max_checkout = "";
            var submission_url = "https://lodging.bookwesteros.com";

            var s = document.createElement("script"), t = document.getElementsByTagName("script")[0];                 
            s.id = "rootrezScript";
            s.src = "https://assets.rootrez.com/book_your_stay/dist/widget.min.js";
            s.setAttribute("data-default_checkin", default_checkin);
            s.setAttribute("data-min_checkin",min_checkin);
            s.setAttribute("data-max_checkout",max_checkout);
            s.setAttribute("data-submission_url",submission_url);
            t.parentNode.insertBefore(s, t);
        };
        window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
    })(window, document);
</script>
<div id="RootRezWidget"></div> 
```

## Settings

| Variable      | Description |
| ----------- | ----------- |
| default_checkin      | Date the date picker will default to        |
| min_checkin   | The minimum allowed check-in date        |
| max_checkout   | The maximum allowed check-out date        |
| submission_url   | The publishers URL to submit to        |
