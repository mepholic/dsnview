var liveData = require('./lib/liveData.js');
var findData = require('./findData.js');

liveData()
.then(function(content) {
  console.dir(content);
})
