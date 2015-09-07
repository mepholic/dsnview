// Include library
var blessed = require('blessed');
var Q = require('q');
var extend = require('node.extend');
var getDSN = require('./dsn/getDSN.js');

module.exports = function() {
  var myObject = {};
  return Q.Promise(function(resolve, reject, notify) {
    Q.all([
      getDSN.config()
      .then(function(config) {
        myObject = extend(true, myObject, config);
      })
      .fail(function(err) {
        reject(err);
      }),
      getDSN.data()
      .then(function(data) {
        myObject = extend(true, myObject, data);
      })
      .fail(function(err) {
        reject(err);
      })
    ])
    .done(function() {
      resolve(myObject);
    });
  });
}
