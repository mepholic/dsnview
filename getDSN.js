// Import requireds
var parseXML = require('xml2js').parseString;
var Q = require('q');
var fetchLive = require('./lib/fetchLive.js');
var buildLive = require('./lib/buildLive.js')

module.exports = {
  // Get our config
  config : function() {
    var deferred = Q.defer();
    fetchLive.config()
    .then(function(xml) {
      parseXML(xml, function(err, parsed) {
        deferred.resolve(buildLive.config(parsed));
      });
    });
    return deferred.promise;
  },
  // Get our data
  data : function() {
    var deferred = Q.defer();
    fetchLive.data()
    .then(function(xml) {
      parseXML(xml, function(err, parsed) {
          deferred.resolve(buildLive.data(parsed));
      });
    });
    return deferred.promise;
  }
};
