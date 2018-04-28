const RegexIntent = require('../engines/regex/intent');

class IntentGreet extends RegexIntent {
  static get regex(){
    return /\bhi\b|\bhello\b/i;
  }

  static get key(){
    return 'banter.greet';
  }
}

module.exports = IntentGreet;
