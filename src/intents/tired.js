const Intent = require('../intent');

class IntentTired extends Intent {
  static get regex(){
    return /\btir(?:ed|ing)\b|\bshag\b/i;
  }

  static get key(){
    return 'banter.tired';
  }
}

module.exports = IntentTired;
