// Debugging
var inspect = require('eyes').inspector({
    maxLength: false
});

// Import requireds
var parseXML = require('xml2js').parseString;
var fetchLive = require('./lib/fetchLive.js');
var buildLive = require('./lib/buildLive.js')

// Get our config
fetchLive.config()
.then(function(xml) {
    parseXML(xml, function(err, parsed) {
        buildLive.config(parsed, function(result) {
            inspect(result);
        });
    });
});

// Append data to our config
fetchLive.data()
.then(function(xml) {
    parseXML(xml, function(err, parsed) {
        buildLive.data(parsed, function(result) {
            inspect(result);
        });
    });
});
