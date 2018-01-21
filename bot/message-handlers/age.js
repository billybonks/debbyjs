const BaseHandler = require('../base-handler');

class MessageHandlerAge extends BaseHandler  {
  static get regex(){
    return /\bage\b|\bhow\sold\b/i;
  }

  get key(){
    return 'banter.age'
  }
}

module.exports = MessageHandlerAge;
