const RegexIntent = require('../engines/regex/intent');

class IntentMyName extends RegexIntent {
  static get regex(){
    return /\bmy\sname\b/i;
  }

  static get key(){
    return 'banter.myName';
  }
}

module.exports = IntentMyName;
