var http = require('http');
var url = require('url');
var Q = require('q');

module.exports = function(urlArg) {
  var deferred = Q.defer();
  var urlObj = url.parse(urlArg);
  var options = {
    host: urlObj.host,
    path: urlObj.path,
  };
  http.get(options, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      deferred.resolve(body);
    });
    response.on('error', function(e) {
      deferred.reject(e.message);
    });
  });
  return deferred.promise;
};
