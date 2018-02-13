const Message = require('../message');

class MessageIntent extends Message {

  constructor (intent) {
    super();
    this.intent = intent;
  }

}

module.exports = MessageIntent
