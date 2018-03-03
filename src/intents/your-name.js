const Intent = require('../intent');

class IntentYourName extends Intent {
  static get regex(){
    return /\bwho\s(are|r)\b|\b(yo)?ur\sname\b/i;
  }

  static get key(){
    return 'banter.yourName';
  }
}

module.exports = IntentYourName;
