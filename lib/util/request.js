var http = require('http');
var url = require('url');
var Q = require('q');

module.exports = function(url_arg) {
    var deferred = Q.defer();
    var url_obj = url.parse(url_arg);
    var options = {
      host: url_obj.host,
      path: url_obj.path
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
}
