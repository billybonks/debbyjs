class Adapter {
  // An adapter is a specific interface to a chat source for robots.
  //
  // robot - A Robot instance.
  constructor (robot) {
    this.robot = robot;
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
  emote (envelope, messages ) {
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
  receive (data) {
    debugger
    let userId = this.constructUserId(data);
    let user = this.robot.brain.findUser(userId);
    if(!user){
      user = this.robot.brain.createUser(userId, this.getUser(data));
    }
    let message = this.buildMessageObject(data);
    message.user  = user;
    message._raw = data;
    let result = this.robot.handleMessage(message);
    this.send(data, result);
  }
}

module.exports = Adapter;
