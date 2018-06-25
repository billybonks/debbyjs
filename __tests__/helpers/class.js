const setup = function(klass, callback){
  beforeEach(function(){
    global.subject = new klass();
    global.Subject = klass;
  });

  afterEach(function(){
    global.subject = null;
    global.Subject = null;
  });

  callback();
};

const getKlass = function(){
  let testRoot = __dirname.replace('helpers', '');
  let source = require.main.filename.replace(testRoot,'').replace('-test.js', '');
  return require(`../../${source}`);
};

const discribeProxy = function(func){
  return function(callback) {
    const klass = getKlass();
    func(`Unit | ${klass.name}`, function(){
      setup(klass, callback);
    });
  };
};

const describeClass = discribeProxy(describe);

describeClass.only = discribeProxy(describe.only);
describeClass.skip = discribeProxy(describe.skip);

module.exports = describeClass;
