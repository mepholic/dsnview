// Import required modules
var time_offset = Math.floor(new Date().getTime() / 5000);
var request = require('./util/request.js');

// Set NASA URL's
var config_url = 'https://eyes.nasa.gov/dsn/config.xml';
var data_url = 'https://eyes.nasa.gov/dsn/data/dsn.xml?r=' + time_offset;

module.exports = {
  config : function(callback) {
    return request(config_url, function(body) {
      callback(body);
    });
  },
  data : function(callback) {
    return request(data_url, function(body) {
      callback(body);
    });
  }
};
