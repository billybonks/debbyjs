const Intent = require('../intent');

class IntentTaxi extends Intent {
  static get regex(){
    return /\btaxi\b|\bcab\b|\buber\b|\bgrab\b/i;
  }

  static get key(){
    return 'banter.taxi';
  }
}

module.exports = IntentTaxi;
