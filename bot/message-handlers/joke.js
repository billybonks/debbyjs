const BaseHandler = require('../base-handler');

class MessageHandlerJoke extends BaseHandler {
  static get regex(){
    return /\bjoke\b/i;
  }

  get key(){
    return 'banter.joke'
  }
}

module.exports = MessageHandlerJoke;
