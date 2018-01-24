const Adapter = require('./adapter')
const Facebook = require('../../lib/facebook')
let facebook = new Facebook()

class TransportFacebook extends Adapter {
  constructor(bot, appId, accessToken){
    super(bot);
    this.facebook = new Facebook(appId, accessToken)
  }
  send (envelope, messages) {
    let message = messages;
    this.facebook.fbBotResponse(envelope.sender.id, message.response, message.quickReplies);
  }

  //add emoticons  to messages?
  emote (envelope/* , ...strings */) {
    const strings = [].slice.call(arguments, 1)
    return this.send.apply(this, [envelope].concat(strings))
  }

  reply (envelope/* , ...strings */) {}

  run (app) {
    app.post('/webhook', (req, res) => {
      const data = req.body;
      if (data.object !== 'page') {
        return res.sendStatus(200);
      }
      this.receive(data);
      res.sendStatus(200);
    });
  }

  //clean up maybe?
  close () {}

  receive (data) {
    data.entry.forEach(async ({id, messaging ,timestamp}) => {
      let event = messaging[0]
      if(event.read){
        //message read tracking event
        return
      }
      let response = null;
      this.facebook.fbNotedAndTyping(event.sender.id);
      //this.facebook.fbNotedAndTyping(event.sender.id, 'mark_seen');
      if(event.quick_replies){
        response = this.bot.runIntent(data.payload)
      }
      if(event.sender.id !== process.env.FB_PAGE_ID){
        response = this.bot.handleMessage(event);
      }
      this.send(event, response);
      this.facebook.fbNotedAndTyping(event.sender.id, 'typing_off');
    })
  }
  //if comment
  // if (entry.changes) {
  //
  // }

  //if postback
  // if (event.postback) {
  //   postbackPayloadToMessage(event);
  // }

  //if message
  //
}

module.exports = TransportFacebook;
