// Import required modules
var extend = require('node.extend');
var cleanObject = require('../util/cleanObject.js');

module.exports = {
  // Function to build our config object from parsed XML
  config: function(result) {
    // Object structure to populate
    var config = {
      spacecraft: {},
      site: {},
      dish: {},
    };
    // Enumerate spacecraft and shove them into an object
    var scList = result.config.spacecraftMap[0].spacecraft;
    for (var scId in scList) {
      var scObject = cleanObject(scList, scId);
      config.spacecraft = extend(config.spacecraft, scObject);
    }
    // Enumerate sites and shove them into an object
    var siteList = result.config.sites[0].site;
    for (var siteId in siteList) {
      var siteRoot = siteList[siteId];
      var siteName = siteRoot.$.name;
      var siteObject = cleanObject(siteList, siteId);
      config.site = extend(config.site, siteObject);
      // Enumerate dishes and shove them into an object
      var dishList = siteRoot.dish;
      for (var dishId in dishList) {
        var siteInfo = {site: siteName};
        var dishObject = cleanObject(dishList, dishId, siteInfo);
        config.dish = extend(config.dish, dishObject);
      }
    }
    return config;
  },
  data: function(result) {
    // Object structure to populate
    var data = {
      site: {},
      dish: {},
    };
    // Enumerate sites and shove them into an object
    var siteList = result.dsn.station;
    for (var siteId in siteList) {
      var siteObject = cleanObject(siteList, siteId);
      data.site = extend(data.site, siteObject);
    }
    // Enumerate dishes and shove them into an object
    var dishList = result.dsn.dish;
    for (var dishId in dishList) {
      var dishInfo = {
        downSignal: [],
        upSignal: [],
        target: {},
      };
      var dishRoot = dishList[dishId];
      var dishName = dishRoot.$.name;
      var dishObject = cleanObject(dishList, dishId, dishInfo);
      data.dish = extend(data.dish, dishObject);
      // Enumerate targets and shove them into an object
      var targetList = dishRoot.target;
      for (var targetId in targetList) {
        var targetObject = cleanObject(targetList, targetId);
        var targetDest = data.dish[dishName].target;
        targetDest = extend(targetDest, targetObject);
      }
      // Enumerate downsignals and shove them into an object
      var dSList = dishRoot.downSignal;
      var dSArray = data.dish[dishName].downSignal;
      for (var dSId in dSList) {
        dSArray[dSId] = dSList[dSId].$;
      }
      // Enumerate upsignals and shove them into an object
      var uSList = dishRoot.upSignal;
      var uSArray = data.dish[dishName].upSignal;
      for (var uSId in uSList) {
        uSArray[uSId] = uSList[uSId].$;
      }
    }
    return data;
  },
};
