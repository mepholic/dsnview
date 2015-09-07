
var getKeyByName = function(content, name) {
  for (key in content) {
    if (content[key].friendlyName === name) {
      return key;
    }
  }
};

module.exports = {
  // Return an array of friendly site names
  siteList : function(content) {
    var sites = [];
    for (site in content.site) {
      sites.push(content.site[site].friendlyName);
    }
    return sites;
  },
  // Return the site key from a friendly site name
  siteKey : function(content, siteName) {
    return getKeyByName(content.site, siteName);
  },
  // Return an array of friendly dish names belonging to a site
  siteDishes : function(content, siteKey) {
    var dishes = [];
    for (dish in content.dish) {
      if (content.dish[dish].site === siteKey) {
        dishes.push(content.dish[dish].friendlyName);
      }
    }
    return dishes;
  },
  // Return the raw site object based on site key
  siteInfo : function(content, siteKey) {
    return content.site[siteKey];
  },
  // Return the dish key from a friendly dish name
  dishKey : function(content, dishName) {
    return getKeyByName(content.dish, dishName);
  },
  //
  dishTargets : function(content, dishKey) {
    var targets = [];
    var source = content.dish[dishKey].target;
    for (target in source) {
      targets.push(target);
    }
    return targets;
  },
};
