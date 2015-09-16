var liveData = require('./lib/liveData.js');
var findData = require('./findData.js');

var blessed = require('blessed');

var screen = blessed.screen();

// Create Site Box
var siteBox = blessed.list({
  parent: screen,
  width: '49%',
  height: '32%',
  top: '2%',
  left: '1%',
  align: 'left',
  fg: 'lightgreen',
  border: {
    type: 'line'
  },
  style: {
    focus: {
      border: {
        fg: 'yellow'
      }
    }
  },
  selectedBg: 'blue',
  label: 'Sites',
  content: ' Loading... ',
  // Allow mouse support
  mouse: true,
  // Allow key support (arrow keys + enter)
  keys: true,
  // Use vi built-in keys
  vi: true
});

// Create Site Box
var siteInfo = blessed.text({
  parent: screen,
  width: '49%',
  height: '20%',
  top: '2%',
  left: '50%',
  align: 'left',
  fg: 'cyan',
  border: {
    type: 'line'
  },
  label: 'Site Info',
  content: ' Select a Site '
});

// Create Dish Box
var dishBox = blessed.list({
  parent: screen,
  width: '49%',
  height: '32%',
  top: '34%',
  left: '1%',
  align: 'left',
  fg: 'lightgreen',
  border: {
    type: 'line'
  },
  style: {
    focus: {
      border: {
        fg: 'yellow'
      }
    }
  },
  selectedBg: 'blue',
  label: 'Dishes',
  content: ' Select a Site ',
  // Allow mouse support
  mouse: true,
  // Allow key support (arrow keys + enter)
  keys: true,
  // Use vi built-in keys
  vi: true
});

// Create Site Box
var dishInfo = blessed.text({
  parent: screen,
  width: '49%',
  height: '30%',
  top: '22%',
  left: '50%',
  align: 'left',
  fg: 'cyan',
  border: {
    type: 'line'
  },
  label: 'Dish Info',
  content: ' Select a Dish '
});

// Create Target Box
var targetBox = blessed.list({
  parent: screen,
  width: '49%',
  height: '32%',
  top: '65%',
  left: '1%',
  align: 'left',
  fg: 'lightgreen',
  border: {
    type: 'line'
  },
  style: {
    focus: {
      border: {
        fg: 'yellow'
      }
    }
  },
  selectedBg: 'blue',
  label: 'Targets',
  content: ' Select a Dish ',
  // Allow mouse support
  mouse: true,
  // Allow key support (arrow keys + enter)
  keys: true,
  // Use vi built-in keys
  vi: true
});

// Create Site Box
var targetInfo = blessed.text({
  parent: screen,
  width: '49%',
  height: '45%',
  top: '52%',
  left: '50%',
  align: 'left',
  fg: 'cyan',
  border: {
    type: 'line'
  },
  label: 'Target Info',
  content: ' Select a Target '
});

// initially focus the site box
siteBox.focus();
screen.render();

// Allow Tab to go to next window
screen.key('tab', function() {
  screen.focusNext();
});

// Allow Shift-Tab to go back a window
screen.key('S-tab', function () {
  screen.focusPrevious();
});

// Populate Site List with live data
liveData()
.then(function(content) {
  var sites = findData.siteList(content).sort();
  sites.map(function(val) {
    var siteName = content.site[val].friendlyName;
    siteBox.addItem(siteName).set('siteKey', val);
  });
  screen.render();
});

// Populate Dish List and Site Info with live data when site is selected
siteBox.on('select', function(child) {
  var siteKey = child.get('siteKey');
  liveData()
  .then(function(content) {
    // wipe away data in clear items
    dishBox.clearItems();
    // add data to dish list
    var dishes = findData.siteDishes(content, siteKey).sort();
    dishes.map(function(val) {
      var dishName = content.dish[val].friendlyName;
      dishBox.addItem(dishName).set('dishKey', val);
    });
    // wipe away data in site info
    siteInfo.getLines().map(function (val, i) {
      siteInfo.deleteLine(i);
    });
    // add data to site info
    var siteObj = content.site[siteKey];
    // TODO: NASA provides a timezone offset here, use it
    var userTime = new Date(parseInt(siteObj.timeUTC));
    siteInfo.pushLine('Time:      ' + userTime);
    siteInfo.pushLine('Latitude:  ' + siteObj.latitude);
    siteInfo.pushLine('Longitude: ' + siteObj.longitude);
    // draw screen
    screen.render();
  });
});

// Populate Target List with live data when dish is selected
dishBox.on('select', function(child) {
  var dishKey = child.get('dishKey');
  liveData()
  .then(function(content) {
    // dish activity
    var active = false;
    // wipe away data in target list
    targetBox.clearItems();
    // set items in target list
    var targets = findData.dishTargets(content, dishKey).sort();
    if (targets.length === 0) {
      targetBox.addItem('No current targets!');
    } else {
      targets.map(function(val) {
        var line = targetBox.addItem(val);
        line.set('dishKey', dishKey);
        line.set('targetKey', val);
      });
      active = true;
    }
    // wipe away data in dish info
    dishInfo.getLines().map(function(val, i) {
      dishInfo.deleteLine(i);
    });
    // add data to dish info
    var dishObj = content.dish[dishKey];
    dishInfo.pushLine('Type       : ' + dishObj.type);
    if (active) {
      dishInfo.pushLine('Started    : ' + dishObj.created);
      dishInfo.pushLine('Created    : ' + dishObj.updated);
      dishInfo.pushLine('Azimuth    : ' + dishObj.azimuthAngle);
      dishInfo.pushLine('Elevation  : ' + dishObj.elevationAngle);
      dishInfo.pushLine('Wind Speed : ' + dishObj.windSpeed);
      dishInfo.pushLine('Multi-craft: ' + dishObj.isMSPA);
      dishInfo.pushLine('Array      : ' + dishObj.isArray);
      dishInfo.pushLine('Delta Range: ' + dishObj.isDDOR);
    }
    screen.render();
  });
});

// Populate the Target Info box
targetBox.on('select', function(child) {
  var dishKey = child.get('dishKey');
  var targetKey = child.get('targetKey');
  liveData()
  .then(function(content) {
    targetInfo.getLines().map(function(val, i) {
      targetInfo.deleteLine(i);
    });
    // add data to target Info
    var targetObj = content.dish[dishKey].target[targetKey];
    //console.log(ta);
    targetInfo.pushLine('Up Distance  : ' + targetObj.uplegRange);
    targetInfo.pushLine('Down Distance: ' + targetObj.downlegRange);
    targetInfo.pushLine('RT Light Time: ' + targetObj.rtlt);
    screen.render();
  });
});


// Select the first item.
siteBox.select(1);

screen.key('q', function(ch, key) {
    return process.exit(0);
});

screen.render();
