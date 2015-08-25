var http = require('http');
var url = require('url');

module.exports = function(url_arg, callback) {
    var url_obj = url.parse(url_arg);
    var options = {
        host: url_obj.host,
        path: url_obj.path
    };
    return http.get(options, function(response) {
        var body = '';
        response.on('data', function(chunk) {
            body += chunk;
        });
        response.on('end', function() {
            callback(body);
        });
    });
}
