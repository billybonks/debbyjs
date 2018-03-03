const Message = require('./message');

class MessageSticker extends Message {

  constructor (user, room, stickerId) {
    super();
    this.stickerId = stickerId;
  }

}

module.exports = MessageSticker
