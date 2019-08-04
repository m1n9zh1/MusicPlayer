const {task, src, dest, series, watch, parallel} = require('gulp')
const htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const debug = require('gulp-strip-debug');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const connect = require('gulp-connect');
const cleancss = require('gulp-clean-css');

const folder = {
    src: './src/',
    dist: './dist/'
}
const mode = process.env.NODE_ENV == 'development'
task('html', (done) => {
    const page = src(folder.src + 'html/index.html')
        .pipe(connect.reload())
    if (!mode) {
        page.pipe(htmlclean())
    }
    page.pipe(dest(folder.dist + 'html/'))
    done()
})
task('image', (done) => {
    const img = src(folder.src + 'images/*')
        .pipe(connect.reload())
    if (!mode) {
        img.pipe(imagemin())
    }
    img.pipe(dest(folder.dist + 'images/'))
    done()
})

task('css', (done) => {
    const css = src(folder.src + 'css/*')
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(connect.reload())
    if (!mode) {
        css.pipe(cleancss())
    }
    css.pipe(dest(folder.dist + 'css/'))
    done()
})

task('js', (done) => {
    const js = src(folder.src + 'js/*.js')
        .pipe(connect.reload())
    if (!mode) {
        js.pipe(uglify())
        .pipe(debug())
    }
    js.pipe(dest(folder.dist + 'js/'))
    done()
})

task('watch', () => {
    watch(folder.src + 'html/*', series('html'))
    watch(folder.src + 'css/*', series('css'))
    watch(folder.src + 'js/*', series('js'))
})
task('server', () => {
    connect.server({
        port: '8899',
        livereload: true
    })
})
task('default', series('html', 'image', 'css', 'js', parallel("watch", 'server')));