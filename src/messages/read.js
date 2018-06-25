const Message = require('./message');

class MessageRead extends Message {

  constructor (user, room, messageId) {
    super(user, room);
    this.messageId = messageId;
  }

}

module.exports = MessageRead;
