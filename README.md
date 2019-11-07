# Book Your Stay Widget

Stay date and guest selection widget for publishers and affiliates to setup on their website. Adjust the settings in the sample below and provide the HTML/JavaScript snippet to the client. [Click here](https://assets.rootrez.com/book-your-stay/) to view the demo.

## Sample

You can refer to index.html on your localhost or the demo site [https://assets.rootrez.com/book-your-stay/](https://assets.rootrez.com/book-your-stay/).

```html
<style>

    :root {
        --primary-color: orange;
        --secondary-color: pink;
        --book-font: 'proxima-nova';
    }

    #RootRezWidget{
        font-family: var(--book-font);
    }

    @font-face {
        font-family: 'proxima-nova';
        src: url("https://assets.rootrez.com/rr-rangepicker/dist/fonts/proxima-nova/proximanova-regular-webfont.woff2") format("woff2"), url("https://assets.rootrez.com/rr-rangepicker/dist/fonts/proxima-nova/proximanova-regular-webfont.woff") format("woff");
        font-weight: normal;
        font-style: normal;
    }

</style>
<script>
    (function (window, document) {
        var loader = function () {

            var default_checkin = ""; // MM/DD/YYYY (e.g. 06/07/2020)
            var default_checkout = ""; // MM/DD/YYYY (e.g. 06/15/2020)
            var min_checkin = ""; // MM/DD/YYYY (e.g. 06/01/2020)
            var max_checkout = ""; // MM/DD/YYYY (e.g. 06/28/2020)
            
            // required: 
            var submission_url = "https://lodging.bookwesteros.com";
            
            var s = document.createElement("script"), t = document.getElementsByTagName("script")[0];                 
            s.id = "rootrezScript";
            s.src = "https://assets.rootrez.com/book-your-stay/widget.min.js";
            s.setAttribute("data-default_checkin", default_checkin);
            s.setAttribute("data-default_checkout", default_checkout);
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
var submission_url = "https://lodging.bookwesteros.com/referral?Code=rz-78th-annual-widget-festival";
```

For discounts and value-adds:

```javascript
var submission_url = "https://lodging.bookwesteros.com/?PromoCode=FunPack";
```

And for an affiliate with a discount/value-add:

```javascript
var submission_url = "https://lodging.bookwesteros.com/referral?Code=rz-78th-annual-widget-festival&PromoCode=FunPack";
```
## Settings

| Variable      | Description |
| ----------- | ----------- |
| submission_url   | Required. The publishers URL to submit to        |
| default_checkin      | Checkin date the date picker will default to        |
| default_checkout      | Checkout date the date picker will default to        |
| min_checkin   | The minimum allowed check-in date        |
| max_checkout   | The maximum allowed check-out date        |

## Developer Info
[Building an embeddable Javascript widget](https://thomassileo.name/blog/2014/03/27/building-an-embeddable-javascript-widget-third-party-javascript/)

Build file to share in third party script:

```text
widget.min.js
```

Files to do any change in widget html or css are the follows:

HTML: template/form.html
SCSS: resources/scss -> npm run styles

Production: npm run prod

```

After any changes in these files, do the build again for creating the widget.min.js file: 
```bash
npm run build
```
