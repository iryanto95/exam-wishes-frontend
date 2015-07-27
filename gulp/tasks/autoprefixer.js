var gulp = require('gulp');
var config = require('../config').autoprefixer;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefixer', ['markup'], function () {
    return gulp.src(config.src)
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.dest));
});