// Import required modules
var request = require('../util/request.js');

// Commands to fetch config and data
module.exports = {
  config: function() {
    var configUrl = 'https://eyes.nasa.gov/dsn/config.xml';
    return request(configUrl);
  },
  data: function() {
    var timeOffset = Math.floor(new Date().getTime() / 5000);
    var dataUrl = 'https://eyes.nasa.gov/dsn/data/dsn.xml?r=' + timeOffset;
    return request(dataUrl + timeOffset);
  },
};
