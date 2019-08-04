(function ($, root) {
    function PlayManager() {
        this.audio = new Audio()
        this.status = 'pause'
    }
    PlayManager.prototype = {
        play: function () {
                this.audio.play()
                this.status = 'play'
            
        },
        pause: function () {
                this.audio.pause()
                this.status = 'pause'
            
        },
        getAudio: function (src) {
            this.audio.src = src
            this.audio.load()
        },
        playTo: function (time) {
            this.audio.currentTime = time
            this.audio.play()
        }
    }
    root.play = new PlayManager()

})(window.Zepto, window.player || (window.player = {}))