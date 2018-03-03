const Intent = require('../intent');

class IntentBye extends Intent {
  static get regex(){
    return /bye\b/i;
  }

  static get key(){
    return 'banter.bye';
  }
}

module.exports = IntentBye;
