const RegexIntent = require('../engines/regex/intent');

class IntentBored extends RegexIntent  {
  static get regex(){
    return /\bbor(?:ed|ing)\b/i;
  }

  static get key(){
    return 'banter.bored';
  }
}

module.exports = IntentBored;
