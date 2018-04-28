class Adapter {
  // An adapter is a specific interface to a chat source for robots.
  //
  // robot - A Robot instance.
  constructor (robot) {
    this.robot = robot;
  }

  // Public: Raw method for sending data back to the chat source. Extend this.
  //
  // messages - One or more messages to send.
  //
  // Returns nothing.
  send (/*messages*/) {

  }

  // Public: Raw method for sending emote data back to the chat source.
  // Defaults as an alias for send
  //
  // strings  - One or more Strings for each message to send.
  //
  // Returns nothing.
  emote (/*messages*/ ) {

  }

  // Public: Raw method for building a reply and sending it back to the chat
  // source. Extend this.
  //
  // strings  - One or more Strings for each reply to send.
  //
  // Returns nothing.
  reply (/*messages*/) {}

  // Public: Raw method for invoking the bot to run. Extend this.
  //
  // Returns nothing.
  run () {}

  // Public: Raw method for shutting the bot down. Extend this.
  //
  // Returns nothing.
  close () {}


  async findOrCreateContext(userId) {
    let context = await this.robot.brain.getContext(userId);
    if(!context){
      context = await this.robot.brain.saveContext(userId, {});
    }
    return context;
  }


  async findOrCreateUser(userId){
    let user = await this.robot.brain.getUser(userId);
    if(!user){
      //this needs to stay in the adapter because the adapter will have to fetch the user from third party
      user = await this.robot.brain.saveUser(userId, await this.getUser(userId));
    }
    return user;
  }

  // Public: Dispatch a received message to the robot.
  //
  // Returns nothing.
  async receive (data) {
    let userId = this.constructUserId(data);
    let user = await this.findOrCreateUser(userId);
    let context = await this.findOrCreateContext(userId);
    let message = this.buildMessageObject(data);
    message._raw = data;
    let result = await this.robot.handleMessage(message, user, context);
    let response = message.buildResponse(result);
    return this.send(response);
  }
}

module.exports = Adapter;
