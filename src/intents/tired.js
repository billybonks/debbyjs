const RegexIntent = require('../engines/regex/intent');

class IntentTired extends RegexIntent {
  static get regex(){
    return /\btir(?:ed|ing)\b|\bshag\b/i;
  }

  static get key(){
    return 'banter.tired';
  }
}

module.exports = IntentTired;
