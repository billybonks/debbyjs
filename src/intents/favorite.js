const RegexIntent = require('../engines/regex/intent');

class IntentFavorite extends RegexIntent {
  static get regex(){
    return /\bfav(o?urite)?\b/i;
  }

  static get key(){
    return 'banter.favourite';
  }
}

module.exports = IntentFavorite;
