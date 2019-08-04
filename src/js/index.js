(function ($, root) {
let render = root.render
let dataList
let audio = root.play
let control
let timer = null
let endTimer = null
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (res) {
            root.playList.songList(res, 0)
            render(res[0])
            dataList = res
            audio.getAudio(res[0].audio)
            control = new root.controlManager(res.length)
            root.progress.renderAllTime(res[0].duration)
            bindEvent()
            bindTouch()
        },
        error: function (err) {
            alert(err)
        }
    })

}

function bindEvent() {
    $('body').on('playchange', function (e,index) {
        render(dataList[index])
        audio.getAudio(dataList[index].audio)
        root.playList.curSong(index)
        root.progress.renderAllTime(dataList[index].duration)
        if(audio.status == 'play') {
            audio.play()
            watchAudioEnded()
            root.progress.start(0)
            rotated(0)
        }else{
            root.progress.update(0)
        }
        $('.song-img').attr('data-deg', 0).css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
    }).on('click', function () {
        $('.songList').removeClass('show')
    })

    $('.prev-btn').on('click', function () {
        index = control.prev()
        $('body').trigger('playchange', index)
    })
    $('.next-btn').on('click', function () {
        index = control.next()
        $('body').trigger('playchange', index)
    })
    $('.play-btn').on('click', function () {
        if (audio.status == 'pause') {
            audio.play()
            watchAudioEnded()
            root.progress.start()
            let deg = $('.song-img').attr('data-deg')
            rotated(+deg)
            $(this).addClass('playing')
        }else{
            audio.pause()
            clearInterval(endTimer)
            root.progress.stop()
            clearInterval(timer)
            $(this).removeClass('playing')
        }
    })
    $('.list-btn').on('click', function (e) {
        e.stopPropagation()
        $('.songList').addClass('show')
    })
    $('.cancel').on('click', function (e) {
        $('.songList').removeClass('show')
    })
    $('dd').on('click', function (e) {
        e.stopPropagation()
        index = $(this).attr('data-index')
        $('body').trigger('playchange', index)
    })
    $('.pro-bottom').on('click', function (e) {
        e.stopPropagation()
        let width = $('.pro-bottom').offset().width
        let left = $('.pro-bottom').offset().left
        let percent = (e.pageX - left) / width
        let tagX = (percent - 1) * 100 + '%'
        root.progress.update(percent)
        proPlay(percent)
    })
}

function bindTouch() {
    let width = $('.pro-bottom').offset().width
    let left = $('.pro-bottom').offset().left
    let percent
    $('.slider-point').on('touchstart', function () {
        root.play.pause()
        clearInterval(endTimer)
        root.progress.stop()
    }).on('touchmove', function (e) {
        percent = (e.changedTouches[0].pageX - left) / width
        let tagX = (percent - 1) * 100 + '%'
        if (percent >= 0 && percent <= 1) {
            root.progress.update(percent)
        }
    }).on('touchend', function (e) {
        e.stopPropagation()
        if (percent >= 0 && percent <= 1) {
            proPlay(percent)
        }
    })
}

function proPlay(percent) {
    let duration = dataList[control.index].duration
    let curTime = percent * duration
    audio.playTo(curTime)
    audio.status = 'play'
    $('.play-btn').addClass('playing')
    root.progress.start(percent)
    watchAudioEnded()
}

function rotated(deg) {
    clearInterval(timer)
    timer = setInterval(function () {
        deg += 2
        $('.song-img').css({
            'transform' : 'rotateZ(' + deg + 'deg)',
            'transition' : 'all 0.3s linear'
        }).attr('data-deg', deg)
    },300)
   
}

function watchAudioEnded() {
    clearInterval(endTimer)
    endTimer = setInterval(function () {
        if (audio.audio.ended) {
            root.progress.stop()
            let index = control.next()
            $('body').trigger('playchange', index)
        }
    },100)
}

getData('../mock/data.json')

})(window.Zepto, window.player || (window.player = {}))