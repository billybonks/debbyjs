const Intent = require('../intent');

class IntentLaughing extends Intent {
  static get regex(){
    return /\b(a*ha+h[ha]*|o?l+o+l+[ol]*)\b/i;
  }

  static get key(){
    return 'banter.laughing';
  }
}

module.exports = IntentLaughing;
