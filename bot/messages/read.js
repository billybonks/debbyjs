const Message = require('../message');

class MessageRead extends Message {

  constructor (messageId) {
    super();
    this.messageId = messageId;
  }

}

module.exports = MessageRead
