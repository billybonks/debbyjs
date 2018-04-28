const RegexIntent = require('../engines/regex/intent');

class IntentHowAreYou extends RegexIntent {
  static get regex(){
    return /\bhow\s(are|r)\s(you|u)\b/i;
  }

  static get key(){
    return 'banter.howAreYou';
  }
}

module.exports = IntentHowAreYou;
