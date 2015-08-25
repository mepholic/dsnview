var request = require('./util/request.js');

var time_offset = Math.floor(new Date().getTime() / 5000);

var config_url = 'https://eyes.nasa.gov/dsn/config.xml';
var data_url = 'https://eyes.nasa.gov/dsn/data/dsn.xml?r=' + time_offset;

module.exports = {
    data : function(callback) {
        return request(data_url, function(body) {
            callback(body);
        });
    },
    config : function(callback) {
        return request(config_url, function(body) {
            callback(body);
        });
    }
};
