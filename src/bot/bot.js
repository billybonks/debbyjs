const winston = require('winston');
const { format } = require('logform');
const EventEmitter = require('events');

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);
class Bot extends EventEmitter {
  // An adapter is a specific interface to a chat source for robots.
  //
  // robot - A Robot instance.
  constructor ({hardDrive, brain}) {
    super(...arguments);
    this.hardDrive = hardDrive;
    this.brain = brain;
    this.logger = winston.createLogger({
      format: alignedWithColorsAndTime,
      transports: [
        new winston.transports.Console(),
      ]
    });
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

  buildResponse(/*response, recievedMessage*/) {}

  constructUserId() {}

  async findOrCreateContext(userId) {
    let context = await this.hardDrive.getContext(userId);
    if(!context){
      this.logger.info(`Caching context ${userId}`);
      context = await this.hardDrive.saveContext(userId, {});
    } else {
      this.logger.info(`Found cached context ${userId} ${JSON.stringify(context.properties)}`);
    }
    return context;
  }


  async findOrCreateUser(userId, data){
    let user = await this.hardDrive.getUser(userId, data);
    if(!user){
      this.logger.info(`Caching user ${userId}`);

      //this needs to stay in the adapter because the adapter will have to fetch the user from third party
      user = await this.hardDrive.saveUser(userId, await this.getRemoteUser(userId));
    } else {
      this.logger.info(`Found cached user ${userId}`);
    }
    return user;
  }

  // Public: Dispatch a received message to the robot.
  //
  // Returns nothing.
  async receive (data) {
    try {
      let userId = this.constructUserId(data);
      let user = await this.findOrCreateUser(userId, data);
      let context = await this.findOrCreateContext(userId);
      let message = this.buildMessageObject(data);
      message._raw = data;
      let result = await this.brain.handleMessage(message, user, context);
      let response = this.buildResponse(result, message);
      await this.send(response);
    } catch(e) {
      this.emit('error', e);
    }
  }
}

module.exports = Bot;
