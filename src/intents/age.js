const Intent = require('../intent');

class IntentAge extends Intent {
  static get regex(){
    return /\bage\b|\bhow\sold\b/i;
  }

  static get key(){
    return 'banter.age';
  }
}

module.exports = IntentAge;
