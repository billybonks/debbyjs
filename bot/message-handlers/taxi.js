const BaseHandler = require('../base-handler');

class MessageHandlerTaxi extends BaseHandler {
  static get regex(){
    return /\btaxi\b|\bcab\b|\buber\b|\bgrab\b/i;
  }

  get key(){
    return 'banter.taxi'
  }
}

module.exports = MessageHandlerTaxi;
