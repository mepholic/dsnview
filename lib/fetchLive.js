// Import required modules
var time_offset = Math.floor(new Date().getTime() / 5000);
var request = require('./util/request.js');

// Set NASA URL's
var config_url = 'https://eyes.nasa.gov/dsn/config.xml';
var data_url = 'https://eyes.nasa.gov/dsn/data/dsn.xml?r=' + time_offset;

module.exports = {
  config : function() {
    return request(config_url);
  },
  data : function() {
    return request(data_url)
  }
};
