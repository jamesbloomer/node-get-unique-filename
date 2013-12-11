var assert = require('assert'), 
    fs = require('fs'),
    path = require('path'),
    sinon = require('sinon'),
    uniqueFilename = require('../index');

describe('Get unique file name', function() {

    beforeEach(function () {
        sinon.stub(fs, 'exists').yields(false);
    });

    afterEach(function () {
        fs.exists.restore();
    });

    it('should return new file if one already exists', function (done) {
        fs.exists.withArgs('dir1/dir2/file.jpg').yields(true);
        fs.exists.withArgs('dir1/dir2/file-1.jpg').yields(false);

        // if on windows need to setup with back slashes, doesn't hurt for the test to cope with both
        fs.exists.withArgs('dir1\\dir2\\file.jpg').yields(true);
        fs.exists.withArgs('dir1\\dir2\\file-1.jpg').yields(false);

        uniqueFilename.get('dir1/dir2/file.jpg', function(filename) {
            assert.equal(filename, 'dir1/dir2/file-1.jpg');    
            return done();
        });
    });

    it('should return new file if five already exist', function (done) {
        fs.exists.withArgs('dir1/dir2/file.jpg').yields(true);
        fs.exists.withArgs('dir1/dir2/file-1.jpg').yields(true);
        fs.exists.withArgs('dir1/dir2/file-2.jpg').yields(true);
        fs.exists.withArgs('dir1/dir2/file-3.jpg').yields(true);
        fs.exists.withArgs('dir1/dir2/file-4.jpg').yields(true);

        // if on windows need to setup with back slashes, doesn't hurt for the test to cope with both
        fs.exists.withArgs('dir1\\dir2\\file.jpg').yields(true);
        fs.exists.withArgs('dir1\\dir2\\file-1.jpg').yields(true);
        fs.exists.withArgs('dir1\\dir2\\file-2.jpg').yields(true);
        fs.exists.withArgs('dir1\\dir2\\file-3.jpg').yields(true);
        fs.exists.withArgs('dir1\\dir2\\file-4.jpg').yields(true);

        uniqueFilename.get('dir1/dir2/file.jpg', function(filename) {
            assert.equal(filename, 'dir1/dir2/file-5.jpg');    
            return done();
        });
    });
});

