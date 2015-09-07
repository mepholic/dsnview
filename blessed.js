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

liveData()
.then(function(content) {
  sites = findData.siteList(content).sort();
  siteBox.setItems(sites);
  screen.render();
});

siteBox.on('select', function() {
  var selected = this.value;
  liveData()
  .then(function(content) {
    selected = findData.siteKey(content, selected);
    var dishes = findData.siteDishes(content, selected).sort();
    dishBox.setItems(dishes);
    dishBox.focus();
    screen.render();
  });
});

dishBox.on('select', function() {
  var selected = this.value;
  liveData()
  .then(function(content) {
    selected = findData.dishKey(content, selected);
    var targets = findData.dishTargets(content, selected).sort();
    targetBox.setItems(targets);
    targetBox.focus();
    screen.render();
  });
});

// Allow scrolling with the mousewheel (manually).
// list.on('wheeldown', function() {
//   list.down();
// });
//
// list.on('wheelup', function() {
//   list.up();
// });

// Select the first item.
siteBox.select(1);

screen.key('q', function(ch, key) {
    return process.exit(0);
});

screen.render();
