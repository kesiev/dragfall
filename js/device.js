let DEVICE=(function(){

    return {
        warnings:[],

        initialize:function() {
            let
                audio = document.createElement('audio'),
                userAgent = navigator.userAgent;

            this.canPlayOgg = !!(audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));

            this.isIpad = !!userAgent.match(/iPad/i);
            this.isIphone = !!userAgent.match(/iPhone/i);
            this.isApple = this.isIpad || this.isIphone;

            this.isChrome = !!userAgent.match(/Chrome/i);
            this.isFirefox = !!userAgent.match(/Firefox/i);

            this.isAndroid = !!userAgent.match(/android/i);

            // --- Game related

            document.body.className = (this.isFirefox ? "firefox" : this.isChrome ? "chrome" : "") + " " + (this.isAndroid ? "android" : "")

            // --- cssFilters mode is no longer needed - kept for future compat issues.
            // CONST.COMPAT.cssFilters = true;

        }
    }

})();
