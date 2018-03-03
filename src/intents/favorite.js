const Intent = require('../intent');

class IntentFavorite extends Intent {
  static get regex(){
    return /\bfav(o?urite)?\b/i;
  }

  static get key(){
    return 'banter.favourite';
  }
}

module.exports = IntentFavorite;
