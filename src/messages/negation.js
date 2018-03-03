const Message = require('./message');

class MessageNegation extends Message {

  constructor (user, room) {
    super(user, room);
  }

}

module.exports = MessageNegation
