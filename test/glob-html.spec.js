'use strict';

var assert = require("assert"),
    fs = require('fs');

describe('glob-html', function(){
    it('should expand glob sources', function() {
        var actual = fs.readFileSync('test/tmp/content.html').toString(),
            expected = fs.readFileSync('test/expected/content.html').toString();
        assert.equal(actual, expected);
    });
    it('should not change file without glob sources', function() {
        var actual = fs.readFileSync('test/tmp/empty-content.html').toString(),
            expected = fs.readFileSync('test/examples/empty-content.html').toString();
        assert.equal(actual, expected);
    });
    it('should expand glob sources with base path', function() {
        var actual = fs.readFileSync('test/tmp/basePath/content.html').toString(),
            expected = fs.readFileSync('test/expected/content_base_path.html').toString();
        assert.equal(actual, expected);
    });
});

