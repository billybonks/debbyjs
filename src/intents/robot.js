const Intent = require('../intent');

class IntentRobot extends Intent {
  static get regex(){
    return /\bhuman\b|\b(ro)?bot\b|\bmachine\b|\bapp\b|\bprogram\b|\breal\b/i;
  }

  static get key(){
    return 'banter.robots';
  }
}

module.exports = IntentRobot;
