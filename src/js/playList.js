(function ($, root) {
    function songList(dataList, i) {
        let str = ''
        dataList.forEach(function (item, index) {
            str += '<dd data-index=' + index + '>' + item.song + '<span>-' + item.singer + '</span></dd>'
        })
        $('.songList dl').prepend($(str))
        $('dd')[i].className = 'sign'
    }
    function curSong(index) {
        $('.sign').removeClass('sign')
        $('dd')[index].className = 'sign'
        
    }

    root.playList = {
        songList: songList,
        curSong: curSong
    }
})(window.Zepto, window.player || (window.player = {}))