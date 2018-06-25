const Message = require('./message');

class MessageSticker extends Message {

  constructor (user, room, stickerId) {
    super(user, room);
    this.stickerId = stickerId;
  }

}

module.exports = MessageSticker;
