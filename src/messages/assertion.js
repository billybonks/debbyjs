const Message = require('./message');

class MessageAssertion extends Message {

  constructor (user, room) {
    super(user, room);
  }

}

module.exports = MessageAssertion;
