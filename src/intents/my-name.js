const Intent = require('../intent');

class IntentMyName extends Intent {
  static get regex(){
    return /\bmy\sname\b/i;
  }

  static get key(){
    return 'banter.myName';
  }
}

module.exports = IntentMyName;
