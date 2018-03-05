const Intent = require('../intent');

class IntentWorking extends Intent {
  static get regex(){
    return /\bworking\b/i;
  }

  static get key(){
    return 'banter.working';
  }
}

module.exports = IntentWorking;
