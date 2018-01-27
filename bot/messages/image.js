const Message = require('../message');

class MessageImage extends Message {

  constructor (imageUrl) {
    super();
    this.imageUrl = imageUrl;
  }

}

module.exports = MessageImage
