const BaseHandler = require('../base-handler');

class MessageHandlerWorking extends BaseHandler {
  static get regex(){
    return /\bworking\b/i;
  }

  get key(){
    return 'banter.working'
  }
}

module.exports = MessageHandlerWorking;
