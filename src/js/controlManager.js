(function ($, root) {
    function ControlManager(len) {
        this.index = 0
        this.len = len
    }

    ControlManager.prototype = {
        prev: function () {
            return this.getIndex(-1)
        },
        next: function () {
            return this.getIndex(1)
        },
        getIndex: function (val) {
            this.index = (val + this.len + this.index) % this.len
            return this.index
        }
    }
    root.controlManager = ControlManager
})(window.Zepto, window.player || (window.player = {}))