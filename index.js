var through = require('through2'),
    gutil = require('gulp-util'),
    globhtml = require('./glob-html');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        var content;

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-glob-html', 'Streams are not supported!'));
            return cb();
        }
        if (file.isBuffer()) {
            content = file.contents.toString('utf8');
            content = globhtml(content, file.base);
            file.contents = new Buffer(content);
        }
        this.push(file);
        cb();
    });
};