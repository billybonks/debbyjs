const BaseHandler = require('../base-handler');

class MessageHandlerLaughing extends BaseHandler {
  static get regex(){
    return /\b(a*ha+h[ha]*|o?l+o+l+[ol]*)\b/i;
  }

  get key(){
    return 'banter.laughing'
  }
}

module.exports = MessageHandlerLaughing;
