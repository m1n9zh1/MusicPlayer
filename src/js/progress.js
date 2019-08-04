(function ($, root) {
    let startTime
    let lastPer = 0
    let duration
    let frameId


    function renderAllTime(time) {
        duration = time
        lastPer = 0
        let allTime = timeFormat(time)
        $('.all-time').html(allTime)
    }
    function timeFormat(time) {
        time = Math.round(time)
        let m = Math.floor( time / 60)
        let s = time % 60
        if (m < 10) {
            m = '0' + m
        }
        if (s < 10) {
            s = '0' + s
        }
        return m + ":" + s
    }
    
    function start(p) {
        lastPer = p === undefined ? lastPer : p
        cancelAnimationFrame(frameId)
        startTime = new Date().getTime()
        function frame () {
            let curTime = new Date().getTime()
            let percent = lastPer + (curTime - startTime) / (duration * 1000)
            update(percent)
            frameId = requestAnimationFrame(frame)
        }
        frame()
    }
    function update(p) {
        let time = Math.round(p * duration);
        let formatTime = timeFormat(time)
        $('.cur-time').html(formatTime)
        let percentX = (p - 1) * 100 + '%'
        $('.pro-top').css({
            transform : 'translateX(' + percentX + ')'
        })
    }
    function stop() {
        let lastTime = new Date().getTime()
        lastPer = lastPer + (lastTime - startTime) / (duration * 1000)
        cancelAnimationFrame(frameId)
    }

    root.progress = {
        renderAllTime : renderAllTime,
        start: start,
        stop: stop,
        update: update
    }



})(window.Zepto, window.player || (window.player = {}))