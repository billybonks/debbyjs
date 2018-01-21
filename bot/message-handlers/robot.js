const BaseHandler = require('../base-handler');

class MessageHandlerRobot extends BaseHandler {
  static get regex(){
    return /\bhuman\b|\b(ro)?bot\b|\bmachine\b|\bapp\b|\bprogram\b|\breal\b/i;
  }

  get key(){
    return 'banter.robots'
  }
}

module.exports = MessageHandlerRobot;
