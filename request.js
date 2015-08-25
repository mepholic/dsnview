var http = require('http');
var url = require('url');

module.exports = function (url_arg, callback) {
    var url_obj = url.parse(url_arg);
    return http.get({
        host: url_obj.host,
        path: url_obj.path
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            console.log(body);
        })
    });
}
