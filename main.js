var inspect = require('eyes').inspector({
    maxLength: false
});

var fetchLive = require('./lib/fetchLive.js');
var parseXML = require('xml2js').parseString;

fetchLive.config(function(xml) {
    parseXML(xml, function(err, result) {
        // Enumerate spacecraft and shove them into an object
        var spacecraft = {};
        var scList = result.config.spacecraftMap[0].spacecraft;
        for (scId in scList) {
            var scRoot = scList[scId]
            var scObject = scRoot.$;
            var scName = scObject.name;
            spacecraft[scName] = scObject;
            delete spacecraft[scName].name;
        };
        // Enumerate sites and shove them into an object
        var site = {};
        var dish = {};
        var siteList = result.config.sites[0].site;
        for (siteId in siteList) {
            var siteRoot = siteList[siteId];
            var siteObject = siteRoot.$;
            var siteName = siteObject.name;
            site[siteName] = siteObject;
            delete site[siteName].name;

            // Enumerate dishes and shove them into an object
            var dishList = siteRoot.dish;
            for (dishId in dishList) {
                var dishRoot = dishList[dishId];
                var dishObject = dishRoot.$;
                var dishName = dishObject.name;
                dish[dishName] = dishObject;
                dish[dishName]['site'] = siteName;
                delete dish[dishName].name;
            };
        };
        console.log(dish);
    });
});
