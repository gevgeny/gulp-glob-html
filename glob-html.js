var cheerio = require('cheerio'),
    path = require('path'),
    _ = require('lodash'),
    glob = require('glob');

//var isDir = function (path) {
//    return grunt.util._.endsWith(path, '/');
//};

/**
 * Expand element with glob to matched values.
 * @param {object} $element Element with glob.
 * @param {string} attr Resource attr. (src, href).
 * @param {string} base Base directory to search in.
 * @param {object} opts Options
 * @return {Array<object>} matched values.
 * */
var expandElement = function ($element, attr, base, opts) {
    var path = $element.attr(attr),
        expandedPaths = glob.sync(path, { cwd : base });

    //grunt.log.writeln('Expand ' + path.cyan + ' to ' + expandedPaths.length.toString().cyan + ' files');

    return expandedPaths.map(function (path) {
        if (typeof opts.basePath === 'string' && path.indexOf(opts.basePath) === 0) {
            path = path.substring(opts.basePath.length);
        }
        return $element.clone().attr(attr, path).toString();
    });
};

/**
 * Checks whether element should be handled and return appropriate attr in accordance with element type:
 * link - href, script - src.
 * @param {object} $element element to handle.
 * @return {string} attr to handle. ('src', 'href', undefined)
 * */
var getAttrToHandle = function ($element) {
    var attr;

    if ($element.is('script')) {
        attr = 'src';
    } else if ($element.is('link')) {
        attr = 'href';
    }

    if (($element.attr(attr) || '').indexOf('*') !== -1) {
        return attr;
    }
};

/**
 * Fetches element's indent.
 * @param {object} $element element to handle.
 * @return {string} indent;
 * */
var fetchIndent = function ($element) {
    var indent = '';

    // Check whether prev element is whitespace.
    if (/^\s+$/.test($element[0].prev.data)) {
        indent = $element[0].prev.data;

        // Cut line break.
        indent = _.last(indent.split(/\n|\r/));
    }

    return '\n' + indent;
};

var processFile = function (content, base, opts) {
    var $ = cheerio.load(content),
        $elements = $('script,link'),
        noElementsFound = true;

    $elements.each(function (i, element) {
        var $element = $(element), indent,
            attr = getAttrToHandle($element);

        if (!attr) {
            return;
        }
        noElementsFound = false;
        indent = fetchIndent($element);

        // Expand initial script to matched ones.
        expandElement($element, attr, base, opts).forEach(function (element, i) {
            if (i === 0) {
                $element.before(element);
            } else {
                $element.before(indent + element);
            }
        });
        $element.remove();
    });

    if (noElementsFound) {
        return content;
    }

    return $.html();
};

module.exports = processFile;
