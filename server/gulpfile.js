var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
  return gulp.src('../client/dev/assets/scss/**/*.scss')
    .pipe(plumber(function(error) {
        console.log(error);
        this.emit('end');
    }))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('../client/dev/assets/css'))
});

gulp.task('watch', function() {
  return gulp.watch('../client/dev/assets/scss/**/*.scss', ['sass']);
  // Other watchers
});

gulp.task('minify-js', function () {
  return gulp.src(['../client/dev/assets/**/*.js'])
  .pipe(uglify())
  .pipe(rename(function(path) {
    path.dirname = "js";
    path.basename += ".min";
  }))
  .pipe(gulp.dest('public/dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('../client/dev/assets/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest('public/dist/css'));
});

gulp.task('htmlreplace', function() {
  return gulp.src('../client/dev/index.html')
  .pipe(htmlreplace({
    'js': 'js/main.min.js',
    "css": "css/main.min.css"
  }))
  .pipe(gulp.dest('public/dist'));
});

gulp.task("build", function() {
  runSequence(['minify-js', 'minify-css'], "htmlreplace");
});

gulp.task("default", ["watch"]);
