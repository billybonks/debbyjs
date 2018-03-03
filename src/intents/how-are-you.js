const Intent = require('../intent');

class IntentHowAreYou extends Intent {
  static get regex(){
    return /\bhow\s(are|r)\s(you|u)\b/i;
  }

  static get key(){
    return 'banter.howAreYou';
  }
}

module.exports = IntentHowAreYou;
