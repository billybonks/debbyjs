const Message = require('./message');

class MessageText extends Message {
  // Represents an incoming message from the chat.
  //
  // user - A User instance that sent the message.
  constructor (user, room, text) {
    super(user, room);
    this.text = text;
  }

}

module.exports = MessageText
