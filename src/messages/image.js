const Message = require('./message');

class MessageImage extends Message {

  constructor (user, room, imageUrl) {
    super(user, room);
    this.imageUrl = imageUrl;
  }

}

module.exports = MessageImage;
