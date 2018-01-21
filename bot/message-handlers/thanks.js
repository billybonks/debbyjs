const BaseHandler = require('../base-handler');

class MessageHandlerThanks extends BaseHandler {
  static get regex(){
    return /\bthanks?\b|\bth?nx\b|\btq\b/i;
  }

  get key(){
    return 'banter.thanks'
  }
}

module.exports = MessageHandlerThanks;
