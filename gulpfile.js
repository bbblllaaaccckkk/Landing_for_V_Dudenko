const gulp = require('gulp'); //подключаем gulp
const sass = require('gulp-sass'); //sass- пересобирает в css
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat'); //склеивает файлы
const rigger = require('gulp-rigger');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const minifyCss = require('gulp-minify-css'); //сжимает css
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');


gulp.task('html', function () {
    gulp.src('app/*html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream: true}));
});



gulp.task('sass', function() {
    return gulp.src('./app/styles/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
    //   .pipe(concat('_main.scss'))
      .pipe(gulp.dest('./app/styles/'))
      .pipe(reload({stream: true}));
});

gulp.task('css', function(){
    return gulp.src('./app/styles/*css')
    .pipe(concat('css.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('bootstrapCss', function() {
    return gulp.src('./app/css/*')
    .pipe(gulp.dest('build/css'));
});


gulp.task('bootsrapJs', function() {
    return gulp.src('./app/js/*')
    .pipe(gulp.dest('build/js'));
});

// gulp.task('fancybox', function() {
//     return gulp.src('./app/fancybox/**/*')
//     .pipe(gulp.dest('build/fancybox'));
// });


gulp.task('images', function(){
    return gulp.src("./app/images/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ], {
        verbose: true
    }))
    .pipe(gulp.dest('build/images/'))
    .pipe(reload({stream: true}));
});


gulp.task('reload-css', function(){
    runSequence('sass', 'css');
});



gulp.task('browser-sync', function(){
    browserSync({
        startPath: '/',
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('watch',function(){
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/styles/*.scss', ['reload-css']);
    gulp.watch('app/js/scriptForGallery.js', ['bootsrapJs']);
    // gulp.watch('app/images/**/*', ['images']);
});

gulp.task('clean', function(){
    return gulp.src('build')
    .pipe(clean());
});

gulp.task('run', function(){
    runSequence( 'clean', 'html', 'reload-css',  'watch', 'bootstrapCss', 'bootsrapJs', 'images', 'browser-sync');
});

gulp.task('default', ['run']); 