const Message = require('./message');

class MessageIntent extends Message {

  constructor (user, room, intent) {
    super(user, room);
    this.intent = intent;
  }

}

module.exports = MessageIntent;
