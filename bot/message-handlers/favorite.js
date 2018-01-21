const BaseHandler = require('../base-handler');

class MessageHandlerFavorite extends BaseHandler {
  static get regex(){
    return /\bfav(o?urite)?\b/i;
  }

  get key(){
    return 'banter.favourite'
  }
}

module.exports = MessageHandlerFavorite;
