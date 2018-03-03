const Message = require('./message');

class MessageIntent extends Message {

  constructor (user, room, intent) {
    super();
    this.intent = intent;
  }

}

module.exports = MessageIntent
