const Bot = require('../bot');
const SlackClient = require('./client');
const { MessageText } = require('../../messages');

class SlackBot extends Bot {
  constructor({hardDrive, brain, options}){
    super({hardDrive, brain});
    if(options){
      this.client = new SlackClient({token: options.accessToken});
    }
  }

  send (messages) {
    const sent_messages = [];
    if(!(messages instanceof Array)) {
      messages = [messages];
    }
    for (let message of messages) {
      if (message !== '') {
        sent_messages.push(this.client.send(message));
      }
    }
    return sent_messages;
  }

  async getUser(userId){
    let user = await this.client.web.users.info(userId.split('_')[1]);
    return user.user;
  }

  run () {
    this.client.onMessage(this.receiveProxy.bind(this));
    this.client.connect();
  }

  receiveProxy(message){
    if(message.bot_id){
      return;
    }
    else {
      this.receive(message);
    }
  }
  constructUserId(rawMessage){
    return `slack-${rawMessage.team}_${rawMessage.user}`;
  }

  buildMessageObject(rawMessage){
    //text
    return new MessageText(rawMessage.user,  rawMessage.channel, rawMessage.text);
  }
}

module.exports = SlackBot;
