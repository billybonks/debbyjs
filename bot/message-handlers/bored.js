const BaseHandler = require('../base-handler');

class MessageHandlerBored extends BaseHandler  {
  static get regex(){
    return /\bbor(?:ed|ing)\b/i;
  }

  get key(){
    return 'banter.bored'
  }
}

module.exports = MessageHandlerBored;
