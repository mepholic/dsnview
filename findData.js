var getKeyByName = function(content, name) {
  for (var key in content) {
    if (content[key].friendlyName === name) {
      return key;
    }
  }
};

var getKeys = function(content, check) {
  var keys = [];
  for (var key in content) {
    if (typeof check === 'object') {
      if (content[key][check.item] === check.match) {
        keys.push(key);
      }
    } else {
      keys.push(key);
    }
  }
  return keys;
};

var getSignals = function(source, dishKey, spacecraftKey) {
  var signals = [];
  var idx = 0;
  source.map(function(val) {
    if (val.spacecraft === spacecraftKey) {
      signals[idx] = val;
      idx++;
    }
  });
  return signals;
};

module.exports = {
  // Return a list of site keys
  siteList: function(content) {
    return getKeys(content.site);
  },
  // Return a list of dish keys for a site
  siteDishes: function(content, siteKey) {
    var check = { item: 'site', match: siteKey };
    return getKeys(content.dish, check);
  },
  // Return an arrat of friendly target names belonging to a dish
  dishTargets: function(content, dishKey) {
    var source = content.dish[dishKey].target;
    return getKeys(source);
  },
  getSpacecraft: function(content, spacecraftKey) {
    return content.spacecraft[spacecraftKey.toLowerCase()];
  },
  getDownSignals: function(content, dishKey, spacecraftKey) {
    var source = content.dish[dishKey].downSignal;
    return getSignals(source, dishKey, spacecraftKey);
  },
  getUpSignals: function(content, dishKey, spacecraftKey) {
    var source = content.dish[dishKey].upSignal;
    return getSignals(source, dishKey, spacecraftKey);
  },
};
