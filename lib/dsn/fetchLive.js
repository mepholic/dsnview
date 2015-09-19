// Import required modules
var request = require('../util/request.js');

// commands to fetch config and data
module.exports = {
  config : function() {
    var config_url = 'https://eyes.nasa.gov/dsn/config.xml';
    return request(config_url);
  },
  data : function() {
    var time_offset = Math.floor(new Date().getTime() / 5000);
    var data_url = 'https://eyes.nasa.gov/dsn/data/dsn.xml?r=' + time_offset;
    return request(data_url + time_offset);
  }
};
