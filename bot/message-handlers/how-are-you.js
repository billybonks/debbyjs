const BaseHandler = require('../base-handler');

class MessageHandlerHowAreYou extends BaseHandler {
  static get regex(){
    return /\bhow\s(are|r)\s(you|u)\b/i;
  }

  get key(){
    return 'banter.howAreYou'
  }
}

module.exports = MessageHandlerHowAreYou;
