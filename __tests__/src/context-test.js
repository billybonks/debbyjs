const describeClass = require('../helpers/class');

describeClass(() => {
  require('./shared/test-for-brain-file');
  require('./shared/test-for-brain-file-child')('updateContext', [{id:12}, {x:1}]);
});
