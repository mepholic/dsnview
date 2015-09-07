var inspect = require('eyes').inspector({
    maxLength: false
});

var liveData = require('./lib/liveData.js');
var findData = require('./findData.js');

var blessed = require('blessed');

var screen = blessed.screen();

var siteBox = blessed.list({
    parent: screen,
    width: '98%',
    height: '48%',
    top: '0%+2',
    left: '1%',
    align: 'left',
    fg: 'lightgreen',
    border: {
        type: 'line'
    },
    selectedBg: 'red',
    label: 'Sites',
    content: ' Loading... ',

    // Allow mouse support
    mouse: true,

    // Allow key support (arrow keys + enter)
    keys: true,

    // Use vi built-in keys
    vi: true
});

var dishBox = blessed.list({
  parent: screen,
  width: '54%',
  height: '46%',
  top: '48%+2',
  left: '1%',
  align: 'left',
  fg: 'lightgreen',
  border: {
      type: 'line'
  },
  selectedBg: 'red',
  label: 'Dishes',
  content: ' Loading... ',

  // Allow mouse support
  mouse: true,

  // Allow key support (arrow keys + enter)
  keys: true,

  // Use vi built-in keys
  vi: true
});

var dishBox = blessed.list({
  parent: screen,
  width: '49%',
  height: '46%',
  top: '48%+2',
  left: '1%',
  align: 'left',
  fg: 'lightgreen',
  border: {
      type: 'line'
  },
  selectedBg: 'red',
  label: 'Dishes',
  content: ' Select a Site ',

  // Allow mouse support
  mouse: true,

  // Allow key support (arrow keys + enter)
  keys: true,

  // Use vi built-in keys
  vi: true
});

var targetBox = blessed.list({
  parent: screen,
  width: '49%',
  height: '46%',
  top: '48%+2',
  left: '50%',
  align: 'left',
  fg: 'lightgreen',
  border: {
      type: 'line'
  },
  selectedBg: 'red',
  label: 'Targets',
  content: ' Select a Dish ',

  // Allow mouse support
  mouse: true,

  // Allow key support (arrow keys + enter)
  keys: true,

  // Use vi built-in keys
  vi: true
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

// Populate Dish List with live data when site is selected
siteBox.on('select', function(child) {
  var siteKey = child.get('siteKey');
  liveData()
  .then(function(content) {
    dishBox.clearItems();
    var dishes = findData.siteDishes(content, siteKey).sort();
    dishes.map(function(val) {
      var dishName = content.dish[val].friendlyName;
      dishBox.addItem(dishName).set('dishKey', val);
    });
    dishBox.focus();
    screen.render();
  });
});

// Populate Target List with live data when dish is selected
dishBox.on('select', function(child) {
  var dishKey = child.get('dishKey');
  liveData()
  .then(function(content) {
    targetBox.clearItems();
    var targets = findData.dishTargets(content, dishKey).sort();
    targets.map(function(val) {
      targetBox.addItem(val).set('targetKey', val);
    });
    targetBox.focus();
    screen.render();
  });
});

// Select the first item.
siteBox.select(1);

screen.key('q', function(ch, key) {
    return process.exit(0);
});

screen.render();
