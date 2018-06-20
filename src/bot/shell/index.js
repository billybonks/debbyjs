const Bot = require('../bot');
const ShellClient = require('./client');
const { MessageText } = require('../../messages');

class SlackBot extends Bot {
  constructor({hardDrive, brain}){
    super({hardDrive, brain});
    this.client = new ShellClient(hardDrive.name, console);
  }

  send (message) {
    this.client.send(message);
  }

  getRemoteUser() {
    return this.user;
  }

  constructUserId(data){
    return `shell-${data.sender}`;
  }

  run () {
    this.client.onMessage(this.receive.bind(this));
    this.client.connect();
  }

  buildMessageObject(data) {
    return new MessageText(data.text);
  }

  buildResponse(message, response){
    return {
      user: message.user,
      room: message.room,
      text: response.response,
    };
  }
}

module.exports = SlackBot;
