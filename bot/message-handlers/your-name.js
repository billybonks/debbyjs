const BaseHandler = require('../base-handler');

class MessageHandlerYourName extends BaseHandler {
  static get regex(){
    return /\bwho\s(are|r)\b|\b(yo)?ur\sname\b/i;
  }

  get key(){
    return 'banter.yourName'
  }
}

module.exports = MessageHandlerYourName;
