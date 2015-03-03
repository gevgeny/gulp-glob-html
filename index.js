var through = require('through2'),
    gutil = require('gulp-util'),
    globhtml = require('./glob-html');

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        var opts = options ? options : {};
        var content;

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-glob-html', 'Streams are not supported!'));
            return cb();
        }
        if (file.isBuffer()) {
            content = file.contents.toString(enc);
            content = globhtml(content, file.base, opts);
            file.contents = new Buffer(content);
        }
        this.push(file);
        cb();
    });
};
