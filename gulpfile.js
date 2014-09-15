var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    globhtml = require('./index');

gulp.task('globhtml', function () {
    return gulp.src('./test/examples/**/*.html')
        .pipe(globhtml())
        .pipe(gulp.dest('./test/tmp'));
});

gulp.task('test', function () {
    return gulp.src('./test/*.js')
        .pipe(mocha());
});

gulp.task('default', ['globhtml', 'test']);