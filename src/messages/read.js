const Message = require('./message');

class MessageRead extends Message {

  constructor (user, room, messageId) {
    super();
    this.messageId = messageId;
  }

}

module.exports = MessageRead;
