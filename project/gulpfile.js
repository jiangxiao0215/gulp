var gulp = require('gulp');
var uglify = require('gulp-uglify'); // 获取 uglify 模块（用于压缩 js）
var minifyCSS = require('gulp-minify-css'); // 获取 minify-css 模块（用于压缩 CSS）
var sass = require('gulp-ruby-sass'); //sass
var htmlminify = require("gulp-html-minify"); //页面压缩
var rename = require('gulp-rename'); //重命名
var concat = require("gulp-concat"); //连接
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
var livereload = require('gulp-livereload'); //自动刷新
var connect = require('gulp-connect');
var fileSync = require('gulp-file-sync');
var gutil = require('gulp-util');

var _path = {
    root: './src/',
    dist: './dist/',
    html: './src/app/',
    css: './src/css/',
    js: './src/js/',
    sass: './src/scss/',
    less: './src/less/',
    images: './src/images/',
};

// ///////////////////////////////////////////////////////////////

gulp.task('css', function() {
    gulp.src(_path.css + '*.css')
        .pipe(minifyCSS())
        .pipe(concat('all.css'))
        .pipe(rename('seo.min.css'))
        .pipe(gulp.dest(_path.dist + 'css'))
});

gulp.task('sass', function() {
    return sass(_path.sass + '*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest(_path.dist + 'css'));
});

gulp.task('script', function() {
    gulp.src(_path.js + '*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(rename('seo.min.js'))
        .pipe(gulp.dest(_path.dist + 'js'))
});

gulp.task('images', function() {
    return gulp.src(_path.images + '*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(_path.dist + 'images'));
});


gulp.task('html', function() {
    gulp.src(_path.html + '*.html')
        .pipe(htmlminify())
        // .pipe(connect.reload())
        .pipe(gulp.dest(_path.dist))

});

gulp.task('auto', function() {
    gulp.watch(_path.css + '*.css', ['css']);
    gulp.watch(_path.sass + '*.scss', ['sass']);
    gulp.watch(_path.js + '*.js', ['script']);
    gulp.watch(_path.images + '*', ['images']);
    gulp.watch(_path.html + '*.html', ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: _path.html,
        livereload: true,
        port: 3001
    });
});

gulp.task('default', ['auto','connect'])
