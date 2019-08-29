# Book Your Stay Widget

Stay date and guest selection widget for publishers and affiliates to setup on their website. Adjust the settings in the sample below and provide the HTML/JavaScript snippet to the client. [Click here](https://assets.rootrez.com/book-your-stay/) to view the demo.

## Sample

You can refer to index.html on your localhost or the demo site [https://assets.rootrez.com/book-your-stay/](https://assets.rootrez.com/book-your-stay/).

```html
<script>
    (function (window, document) {
        var loader = function () {

            // required: 
            var submission_url = "https://lodging.bookwesteros.com";
            
            // optional: 
            var default_checkin = ""; // YYYY-MM-DD (e.g. 2020-06-07)
            var min_checkin = ""; // YYYY-MM-DD (e.g. 2020-06-01)
            var max_checkout = ""; // YYYY-MM-DD (e.g. 2020-06-28)
            
            var s = document.createElement("script"), t = document.getElementsByTagName("script")[0];                 
            s.id = "rootrezScript";
            s.src = "https://assets.rootrez.com/book-your-stay/widget.min.js";
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

For affiliates you would adjust the submission_url as follows:

```javascript
var submission_url = "https://lodging.bookwesteros.com/referral?code=rz-78th-annual-widget-festival";
```

For discounts and value-adds:

```javascript
var submission_url = "https://lodging.bookwesteros.com/?PromoCode=FunPack";
```

And for an affiliate with a discount/value-add:

```javascript
var submission_url = "https://lodging.bookwesteros.com/referral?code=rz-78th-annual-widget-festival&PromoCode=FunPack";
```
## Settings

| Variable      | Description |
| ----------- | ----------- |
| submission_url   | Required. The publishers URL to submit to        |
| default_checkin      | Date the date picker will default to        |
| min_checkin   | The minimum allowed check-in date        |
| max_checkout   | The maximum allowed check-out date        |

## Developer Info
[Building an embeddable Javascript widget](https://thomassileo.name/blog/2014/03/27/building-an-embeddable-javascript-widget-third-party-javascript/)

Build file to share in third party script:

```text
widget.min.js
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
