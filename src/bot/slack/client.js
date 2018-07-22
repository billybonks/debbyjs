const {RtmClient, WebClient} = require('@slack/client');
const SlackFormatter = require('./formatter');
const _ = require('lodash');

class SlackClient {
  static initClass() {
    this.PAGE_SIZE = 100;
  }

  constructor(options) {

    this.rtm = new RtmClient(options.token, options.rtm);
    this.rtmStartOpts = options.rtmStart || {};
    // Web is the fallback for complex messages
    this.web = new WebClient(options.token);

    // Message formatter
    this.format = new SlackFormatter(this.rtm.dataStore);

    // Message handler
    this.rtm.on('message', this.messageWrapper, this);
    this.messageHandler = undefined;

  }

  /*
  Open connection to the Slack RTM API
  */
  connect() {
    return this.rtm.start(this.rtmStartOpts);
  }

  /*
  Slack RTM message events wrapper
  */
  messageWrapper(message) {
    if(message.channel[0] ==='C'){
      return;
    }
    if(message.user ==='USLACKBOT'){
      return;
    }
    if (this.messageHandler) {
      const {user, channel, bot_id} = message;
      message.user = user ? user : bot_id;
      message.rawText = message.text;
      message.text = this.format.incoming(message);
      message.channel = channel;
      return this.messageHandler(message);
    }
  }


  // messages sent from human users, apps with a bot user and using the xoxb token, and
  // slackbot have the user property
  // if (user) { message.user = this.rtm.dataStore.getUserById(user); }
  // if (channel) { message.channel = this.rtm.dataStore.getChannelGroupOrDMById(); }
  // bot_id exists on all messages with subtype bot_message
  // these messages only have a user property if sent from a bot user (xoxb token). therefore
  // the above assignment will not happen for all custom integrations or apps without a bot user
  // if (bot_id) { message.bot = this.rtm.dataStore.getBotById(bot_id); }




  /*
  Set message handler
  */
  onMessage(callback) {
    if (this.messageHandler !== callback) { return this.messageHandler = callback; }
  }

  /*
  Disconnect from the Slack RTM API
  */
  disconnect() {
    this.rtm.disconnect();
    // NOTE: removal of event listeners possibly does not belong in disconnect, because they are not added in connect.
    return this.rtm.removeAllListeners();
  }

  /*
  Send a message to Slack using the best client for the message type
  */
  send(message) {
    let room;
    if (message.room) {
      ({ room } = message);
    } else if (message.id) { //Maybe we were sent a user object or channel object. Use the id, in that case.
      room = message.id;
    }

    const options = { as_user: true, link_names: 1, thread_ts: (message.thread != null ? message.thread_ts : undefined) };

    if (typeof message !== 'string') {
      return this.web.chat.postMessage(room, message.text, _.defaults(message, options));
    } else {
      return this.web.chat.postMessage(room, message, options);
    }
  }
}

SlackClient.initClass();


module.exports = SlackClient;
