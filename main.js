var liveData = require('./lib/liveData.js');
var findData = require('./findData.js');

var tab = '  ';

/*
liveData()
.then(function(content) {
  sites = findData.siteList(content);
  for (site in sites) {
    var siteName = sites[site];
    console.log(siteName);
    var siteKey = findData.siteKey(content, siteName);
    var dishes = findData.siteDishes(content, siteKey);
    for (dish in dishes) {
      var dishName = dishes[dish];
      console.log(tab + dishName);
      var dishKey = findData.dishKey(content, dishName);
      var targets = findData.dishTargets(content, dishKey);
      for (target in targets) {
        var targetName = targets[target];
        console.log(tab + tab + targetName);
      }
    }
  }
})
*/

liveData()
.then(function(content) {
  var sites = findData.siteList(content).sort();
  for (site in sites) {
    var siteKey = sites[site];
    var siteName = content.site[siteKey].friendlyName;
    console.log(siteKey, siteName);
    siteBox.addItem(siteName).set('key', siteKey);
  }
})
.fail(function(err) {
  console.log(err);
});
