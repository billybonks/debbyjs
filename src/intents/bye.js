const RegexIntent = require('../engines/regex/intent');

class IntentBye extends RegexIntent {
  static get regex(){
    return /bye\b/i;
  }

  static get key(){
    return 'banter.bye';
  }
}

module.exports = IntentBye;
