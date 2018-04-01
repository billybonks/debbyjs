const RegexIntentTest = require('./regex-intent');
const describeClass = require('./class');

module.exports = function(messages){
  describeClass(() => {
    RegexIntentTest.validate();
    RegexIntentTest.validateMessages(messages);
  });
};
