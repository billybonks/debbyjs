const describeClass = require('../helpers/class');

describeClass(() => {
  require('./shared/test-for-brain-file');

  beforeEach(function(){
    subject.id = 1;
  });

  require('./shared/test-for-brain-file-child')('saveUser', [{x:1}], [1, {x:1}]);
});
