var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('minify-images', function() {
  return gulp.src('dev/assets/images/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('public/dist/assets/images'))
});

gulp.task('sass', function() {
  return gulp.src('dev/assets/scss/main.scss')
    .pipe(plumber(function(error) {
        console.log(error);
        this.emit('end');
    }))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dev/assets/css'))
});

gulp.task('watch', function() {
  return gulp.watch('dev/assets/scss/**/*.scss', ['sass']);
  // Other watchers
});

gulp.task('minify-js', function () {
  return gulp.src(['dev/assets/**/*.js'])
  .pipe(uglify())
  .pipe(rename(function(path) {
    path.dirname = "js";
    path.basename += ".min";
  }))
  .pipe(gulp.dest('public/dist/assets'));
});

gulp.task('minify-css', function() {
  return gulp.src('dev/assets/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest('public/dist/assets/css'));
});

gulp.task('htmlreplace', function() {
  return gulp.src('dev/index.html')
  .pipe(htmlreplace({
    'js': 'assets/js/main.min.js',
    "css": "assets/css/main.min.css"
  }))
  .pipe(gulp.dest('public/dist'));
});

gulp.task('copy-favicons', function() {
  return gulp.src('dev/favicons/*')
    .pipe(gulp.dest('public/dist/favicons'));
});

gulp.task("build", function() {
  runSequence(['minify-js', 'minify-css', "minify-images", "copy-favicons"], "htmlreplace");
});

gulp.task("default", ["watch"]);
