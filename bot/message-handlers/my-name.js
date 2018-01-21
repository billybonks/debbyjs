const BaseHandler = require('../base-handler');

class MessageHandlerMyName extends BaseHandler {
  static get regex(){
    return /\bmy\sname\b/i;
  }

  get key(){
    return 'banter.myName'
  }
}

module.exports = MessageHandlerMyName;
