const Message = require('../message');

class MessageSticker extends Message {

  constructor (stickerId) {
    super();
    this.stickerId = stickerId;
  }

}

module.exports = MessageSticker
