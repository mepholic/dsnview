// Debugging
var inspect = require('eyes').inspector({
    maxLength: false
});

// Import requireds
var fetchLive = require('./lib/fetchLive.js');
var parseXML = require('xml2js').parseString;
var extend = require('node.extend');

// Re-structure a passed in object
var cleanObject = function(list, idx, moreInfo) {
    var myRoot = list[idx];
    var myObject = myRoot.$;
    var myName = myObject.name;
    delete myObject.name;

    // Create a new object and copy the modified object to it
    var newObject = {};
    newObject[myName] = myObject;

    // Add more info if provided
    if (typeof moreInfo === 'object') {
        newObject[myName] = extend(newObject[myName], moreInfo);
    };

    return newObject;
};

// Function to build our config object from parsed XML
var buildConfig = function(result, callback) {
    // Object structure to populate
    var config = {
        spacecraft: {},
        site: {},
        dish: {}
    };
    // Enumerate spacecraft and shove them into an object
    var scList = result.config.spacecraftMap[0].spacecraft;
    for (scId in scList) {
        var scObject = cleanObject(scList, scId);
        config.spacecraft = extend(config.spacecraft, scObject);
    };
    // Enumerate sites and shove them into an object
    var siteList = result.config.sites[0].site;
    for (siteId in siteList) {
        var siteRoot = siteList[siteId];
        var siteName = siteRoot.$.name;
        var siteObject = cleanObject(siteList, siteId);
        config.site = extend(config.site, siteObject);

        // Enumerate dishes and shove them into an object
        var dishList = siteRoot.dish;
        for (dishId in dishList) {
                var siteInfo = {site: siteName};
            var dishObject = cleanObject(dishList, dishId, siteInfo);
            config.dish = extend(config.dish, dishObject);
        };
    };

    callback(config);
};

// Function to build our data object from parsed XML
var buildData = function(result, callback) {
    // Object structure to populate
    var data = {
        site: {},
        dish: {}
    };
    // Enumerate sites and shove them into an object
    var siteList = result.dsn.station;
    for (siteId in siteList) {
        var siteObject = cleanObject(siteList, siteId);
        data.site = extend(data.site, siteObject);
    };
    // Enumerate dishes and shove them into an object
    var dishList = result.dsn.dish;
    for (dishId in dishList) {
        var dishInfo = {
            downSignal: [],
            upSignal: [],
            target: {}
        };
        var dishRoot = dishList[dishId];
        var dishName = dishRoot.$.name;
        var dishObject = cleanObject(dishList, dishId, dishInfo);
        data.dish = extend(data.dish, dishObject);
        // Enumerate targets and shove them into an object
        var targetList = dishRoot.target;
        for (targetId in targetList) {
            var targetObject = cleanObject(targetList, targetId);
            var targetDest = data.dish[dishName].target;
            targetDest = extend(targetDest, targetObject);
        };
        // Enumerate downsignals and shove them into an object
        var dSList = dishRoot.downSignal;
        var dSArray = data.dish[dishName].downSignal;
        for (dSId in dSList) {
                dSArray[dSId] = dSList[dSId].$;
        };
        // Enumerate upsignals and shove them into an object
        var uSList = dishRoot.upSignal;
        var uSArray = data.dish[dishName].upSignal;
        for (uSId in uSList) {
            uSArray[uSId] = uSList[uSId].$;
        };
    };

    callback(data);
};

// Get our config
fetchLive.config(function(xml) {
    parseXML(xml, function(err, parsed) {
        buildConfig(parsed, function(result) {
            inspect(result);
        });
    });
});

// Append data to our config
fetchLive.data(function(xml) {
    parseXML(xml, function(err, parsed) {
        buildData(parsed, function(result) {
            inspect(result);
        });
    });
});
