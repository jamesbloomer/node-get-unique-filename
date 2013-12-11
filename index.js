var fs = require('fs'),
    path = require('path'),
    uniqueFilename = {};

function getUniqueFileName(dir, base, ext, i, done) {
    var filename,
        append = '';

    if (i) {
        append = '-' + i;
    }

    filename = path.join(dir, base + append + ext);
    fs.exists(filename, function(exists) {
        if (exists) {
            setImmediate(function() {
                i = i + 1;
                return getUniqueFileName(dir, base, ext, i, done);
            });
        } else {
            return done(filename);
        }
    });
}


uniqueFilename.get = function(filenameWithPath, done) {
    var dir = path.dirname(filenameWithPath),
        ext = path.extname(filenameWithPath),
        base = path.basename(filenameWithPath, ext);

    return getUniqueFileName(dir, base, ext, null, done);
}

module.exports = uniqueFilename;
