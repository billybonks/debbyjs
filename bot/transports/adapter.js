const Facebook = require('../../lib/facebook')

class Adapter {
  // An adapter is a specific interface to a chat source for robots.
  //
  // robot - A Robot instance.
  constructor (bot) {
    this.bot = bot;
  }

  // Public: Raw method for sending data back to the chat source. Extend this.
  //
  // envelope - A Object with message, room and user details.
  // messages - One or more messages to send.
  //
  // Returns nothing.
  send (envelope, messages) {

  }

  // Public: Raw method for sending emote data back to the chat source.
  // Defaults as an alias for send
  //
  // envelope - A Object with message, room and user details.
  // strings  - One or more Strings for each message to send.
  //
  // Returns nothing.
  emote (envelope/* , ...strings */) {
    const strings = [].slice.call(arguments, 1)
    return this.send.apply(this, [envelope].concat(strings))
  }

  // Public: Raw method for building a reply and sending it back to the chat
  // source. Extend this.
  //
  // envelope - A Object with message, room and user details.
  // strings  - One or more Strings for each reply to send.
  //
  // Returns nothing.
  reply (envelope/* , ...strings */) {}

  // Public: Raw method for invoking the bot to run. Extend this.
  //
  // Returns nothing.
  run () {}

  // Public: Raw method for shutting the bot down. Extend this.
  //
  // Returns nothing.
  close () {}

  // Public: Dispatch a received message to the robot.
  //
  // Returns nothing.
  receive (message) {
    this.robot.receive(message)
  }
}

module.exports = Adapter;
