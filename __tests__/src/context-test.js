const describeClass = require('../helpers/class');

describeClass(() => {
  beforeEach(function(){
    subject.userId = 12;
  });
  require('./shared/test-for-brain-file');
  require('./shared/test-for-brain-file-child')('update', [{x:1}], [12, {x:1}]);
});
