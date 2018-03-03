const Intent = require('../intent');

class IntentThanks extends Intent {
  static get regex(){
    return /\bthanks?\b|\bth?nx\b|\btq\b/i;
  }

  static get key(){
    return 'banter.thanks'
  }
}

module.exports = IntentThanks;
