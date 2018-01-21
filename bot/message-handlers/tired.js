const BaseHandler = require('../base-handler');

class MessageHandlerTired extends BaseHandler {
  static get regex(){
    return /\btir(?:ed|ing)\b|\bshag\b/i;
  }

  get key(){
    return 'banter.tired'
  }
}

module.exports = MessageHandlerTired;
