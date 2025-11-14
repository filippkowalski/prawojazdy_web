/*if ((navigator.userAgent.indexOf('iPhone') == -1) && (navigator.userAgent.indexOf('iPad') == -1) && (navigator.userAgent.indexOf('iPod') == -1) && (navigator.userAgent.indexOf('Windows') == -1) && (navigator.userAgent.indexOf('Android') == -1)) {
    //android восстановить если WebView начнет нормально работать с переносами
    
    var hyphenatorSettings = {
        minwordlength: 4,
        onhyphenationdonecallback : function () {
            if(window.location.hash) {
                var anchor = window.location.hash;      
                if(anchor.length > 1 && anchor.indexOf('#') == 0) {
                    location.href = anchor;
                }
            }       
        }
    }
    Hyphenator.config(hyphenatorSettings);
    Hyphenator.run();
}*/

			




	