// Debugging
var inspect = require('eyes').inspector({
    maxLength: false
});

var getDSN = require('./getDSN.js');

getDSN.config()
.then(function(config) {
  inspect(config);
});

getDSN.data()
.then(function(data) {
  inspect(data);
});
