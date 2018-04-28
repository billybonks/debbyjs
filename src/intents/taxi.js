const RegexIntent = require('../engines/regex/intent');

class IntentTaxi extends RegexIntent {
  static get regex(){
    return /\btaxi\b|\bcab\b|\buber\b|\bgrab\b/i;
  }

  static get key(){
    return 'banter.taxi';
  }
}

module.exports = IntentTaxi;
