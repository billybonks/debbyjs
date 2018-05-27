const describeClass = require('../helpers/class');

describeClass(() => {
  require('./shared/test-for-brain-file');
  require('./shared/test-for-brain-file-child')('update', [{x:1}], ['awesomeKey', {x:1}]);
});
