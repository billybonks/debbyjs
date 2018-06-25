const RegexIntent = require('../engines/regex/intent');

class IntentYourName extends RegexIntent {
  static get regex(){
    return /\bwho\s(are|r)\b|\b(yo)?ur\sname\b/i;
  }

  static get key(){
    return 'banter.yourName';
  }
}

module.exports = IntentYourName;
