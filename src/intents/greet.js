const Intent = require('../intent');

class IntentGreet extends Intent {
  static get regex(){
    return /\bhi\b|\bhello\b/i;
  }

  static get key(){
    return 'banter.greet';
  }
}

module.exports = IntentGreet;
