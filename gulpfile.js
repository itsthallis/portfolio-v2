const gulp = require('gulp');
jade = require('gulp-jade'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
livereload = require('gulp-livereload'),
image = require('gulp-image'),

sass.compiler = require('node-sass');

// Livereload
gulp.task('lreload', function() {
    livereload.reload();
});

// Jade
gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src('./src/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
});

// Sass
gulp.task('sass', function() {
    return gulp.src('./src/styles/index.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles/'))
});

// Js
gulp.task('scripts', function() {
    gulp.src([
            './node_modules/vue/dist/vue.js',
            './src/js/**/*.js',
        ])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {
            read: false
        })
        .pipe(clean());
});

// Images
gulp.task('images', function() {
    return gulp.src('./src/images/*.!(db)')
        .pipe(image())
        .pipe(gulp.dest('./dist/images'));
});

// Html
gulp.task('html', function() {
    gulp.src('./dist/*.html')
        .pipe(livereload());
});

// Watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.sass', ['sass', 'lreload']);
    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('./dist/*.html', ['html']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('dist/images/**/*', ['lreload']);
});

gulp.task('default', ['gulp watch']);