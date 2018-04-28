const RegexIntent = require('../engines/regex/intent');

class IntentThanks extends RegexIntent {
  static get regex(){
    return /\bthanks?\b|\bth?nx\b|\btq\b/i;
  }

  static get key(){
    return 'banter.thanks';
  }
}

module.exports = IntentThanks;
