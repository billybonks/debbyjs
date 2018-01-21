const BaseHandler = require('../base-handler');

class MessageHandlerBye extends BaseHandler {
  static get regex(){
    return /bye\b/i;
  }

  get key(){
    return 'banter.bye'
  }
}

module.exports = MessageHandlerBye;
