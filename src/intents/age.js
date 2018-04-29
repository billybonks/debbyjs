const RegexIntent = require('../engines/regex/intent');

class IntentAge extends RegexIntent {
  static get regex(){
    return /\bage\b|\bhow\sold\b/i;
  }

  static get key(){
    return 'banter.age';
  }
}

module.exports = IntentAge;
