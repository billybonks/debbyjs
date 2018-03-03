const Intent = require('../intent');

class IntentBored extends Intent  {
  static get regex(){
    return /\bbor(?:ed|ing)\b/i;
  }

  static get key(){
    return 'banter.bored';
  }
}

module.exports = IntentBored;
