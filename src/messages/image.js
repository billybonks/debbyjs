const Message = require('./message');

class MessageImage extends Message {

  constructor (user, room, imageUrl) {
    super();
    this.imageUrl = imageUrl;
  }

}

module.exports = MessageImage
