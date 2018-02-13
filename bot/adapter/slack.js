const Adapter = require('./adapter');
const SlackClient = require('./slack-client');

class TransportSlack extends Adapter {
  constructor(bot, options){
    super(bot);
    this.facebook = new SlackClient({token: options.accessToken});
  }

  send (envelope, messages) {
    const sent_messages = [];
    for (let message of Array.from(messages)) {
      if (message !== '') {
        sent_messages.push(this.client.send(envelope, message));
      }
    }
    return sent_messages;
  }

  run () {
    this.client.onMessage(this.receive);
    this.client.connect();
  }

  //clean up maybe?
  close () {}

  receive (message) {
    debugger
  }
}

module.exports = TransportSlack;
