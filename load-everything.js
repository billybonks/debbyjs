const walk = require('walkdir');
walk.sync('./src', function(path, stats) {
  if(stats.isFile()) {
    require(path);
  }
});
