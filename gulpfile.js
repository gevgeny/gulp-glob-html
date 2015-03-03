var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    globhtml = require('./index');

gulp.task('globhtml', function () {
    return gulp.src('./test/examples/**/*.html')
        .pipe(globhtml())
        .pipe(gulp.dest('./test/tmp'));
});

gulp.task('globhtmlbasepath', function () {
    return gulp.src('./test/examples/content.html')
        .pipe(globhtml({ basePath: "scripts1" }))
        .pipe(gulp.dest('./test/tmp/basePath'));
});

gulp.task('test', ['globhtml', 'globhtmlbasepath'], function () {
    return gulp.src('./test/*.js')
        .pipe(mocha());
});

gulp.task('default', ['test']);
