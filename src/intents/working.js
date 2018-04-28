const RegexIntent = require('../engines/regex/intent');

class IntentWorking extends RegexIntent {
  static get regex(){
    return /\bworking\b/i;
  }

  static get key(){
    return 'banter.working';
  }
}

module.exports = IntentWorking;
