#[gulp](https://github.com/wearefractal/gulp)-glob-html
==============

> Add globbing to your HTML

## Installation

```
npm install --save-dev gulp-glob-html
```
## Information

With `gulp-glob-html` you can use [glob](https://github.com/isaacs/node-glob) functionality in your html templates:
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>glob-html example</title>

    <link href="css/*.css" rel="stylesheet" type="text/css">

    <script src="scripts/*"></script>
</head>
<body>
    <p>glob-html example</p>
</body>
</html>
```

and receive the template with matched css and js entries:
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>glob-html example</title>

    <link href="css/style1.css" rel="stylesheet" type="text/css">
    <link href="css/style2.css" rel="stylesheet" type="text/css">
    <link href="css/style3.css" rel="stylesheet" type="text/css">

    <script src="scripts/script1.js"></script>
    <script src="scripts/script2.js"></script>
    <script src="scripts/script3.js"></script>
</head>
<body>
    <p>glob-html example</p>
</body>
</html>
```

## Examples

```js

var gulp = require('gulp'),
    globhtml = require('gulp-glob-html');

gulp.task('default', function () {
    return gulp.src('./templates/**/*.html')
        .pipe(globhtml())
        .pipe(gulp.dest('./temp'));
});
```

Use 'basePath' option to skip url prefix:
```js

var gulp = require('gulp'),
    globhtml = require('gulp-glob-html');

gulp.task('default', function () {
    return gulp.src('./templates/**/*.html')
        .pipe(globhtml({ basePath: "../dist/" }))
        .pipe(gulp.dest('./temp'));
});
```

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Eugene Gluhotorenko
