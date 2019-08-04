(function ($, root) {
//渲染图片、歌曲信息、进度条、按键

//渲染图片
function rImage(src) {
    let img = new Image()
    
    img.onload = function () {
        root.blurImg(img, $('body'))
        $('.img-wrapper img').attr('src', src)
    }
    img.src = src
}

//渲染歌曲信息
function rInfo(data) {
    const str = '<p class="song-name">' + data.song + '</p>\
                <p class="singer-name">' + data.singer + '</p>\
                <p class="album-name">' + data.album + '</p>'
    $('.song-info').html(str)

}

//渲染按键
function isLike(like) {
    if(like){
        $('.like-btn').addClass('liking')
    }else{
        $('.like-btn').removeClass('liking')
    }
}


root.render = function (data) {
    rImage(data.image)
    rInfo(data)
    isLike(data.isLike)
}

})(window.Zepto, window.player || (window.player = {}))