# book-your-stay

Sample third party script

You can refer the demo/index.html for detail

```text
<script>
    (function (window, document) {
        var loader = function () {

            var default_checkin = "";
            var min_checkin = "2019-08-28"; 
            var max_checkout = "";
            var submission_url = "http://alta.publisher.localhost/search";

            var s = document.createElement("script"), t = document.getElementsByTagName("script")[0];                 
            s.id = "rootrezScript";
            s.src = "http://10.254.101.90/book_your_stay_widget/dist/widget.min.js";
            s.setAttribute("data-default_checkin", default_checkin);
            s.setAttribute("data-min_checkin",min_checkin);
            s.setAttribute("data-max_checkout",max_checkout);
            s.setAttribute("data-submission_url",submission_url);
            t.parentNode.insertBefore(s, t);
        };
        window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
    })(window, document);
</script>
```