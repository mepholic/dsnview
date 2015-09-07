var liveData = require('./lib/liveData.js');

liveData()
.then(function(content) {
  console.dir(content);
})
