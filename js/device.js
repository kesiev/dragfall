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

            //  --- Gamepads

            if ("getGamepads" in navigator) {
                this.isGamepad=1;
                this.getGamepads = () => { return navigator.getGamepads(); }
                this.getGamepadButton = (gamepad,pad,button) => { return gamepad[pad]&&gamepad[pad].buttons[button]?gamepad[pad].buttons[button].value > 0 || gamepad[pad].buttons[button].pressed == true:false; }
                this.getGamepadAxes=(gamepad,pad) => { return gamepad[pad]?gamepad[pad].axes:[0,0]; }
            } else if (navigator.webkitGetGamepads) {
                this.isGamepad=1;
                this.getGamepads = () => { return navigator.webkitGetGamepads() }
                this.getGamepadButton = (gamepad,pad,button) => { return gamepad[pad]?gamepad[pad].buttons[button] == 1:0; }
                this.getGamepadAxes = (gamepad,pad) => { return gamepad[pad]?gamepad[pad].axes:[0,0]; }
            } else this.isGamepad=0;

            // --- Game related

            document.body.className = (this.isFirefox ? "firefox" : this.isChrome ? "chrome" : "") + " " + (this.isAndroid ? "android" : "")

            // --- cssFilters mode is no longer needed - kept for future compat issues.
            // CONST.COMPAT.cssFilters = true;

        }
    }

})();
