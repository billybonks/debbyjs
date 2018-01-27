const Adapter = require('./adapter')
const Facebook = require('../../lib/facebook')
const MessageText = require('../messages/text');
const MessageImage = require('../messages/image');
const MessageIntent = require('../messages/intent');
const MessageRead = require('../messages/read');
const MessageSticker = require('../messages/sticker');

class AdapterFacebook extends Adapter {


  constructor(robot, appId, accessToken){
    super(robot);
    this.facebook = new Facebook(appId, accessToken)
  }
  send (envelope, messages) {
    let message = messages;
    this.facebook.botResponseText(envelope.sender.id, message.response, message.quickReplies);
  }

  //add emoticons  to messages?
  emote (envelope/* , ...strings */) {
    const strings = [].slice.call(arguments, 1)
    return this.send.apply(this, [envelope].concat(strings))
  }

  reply (envelope/* , ...strings */) {}

  run (app) {
    debugger
    app.post('/webhook', (req, res) => {
      const data = req.body;

      if (data.object !== 'page') {
        return res.sendStatus(200);
      }

      data.entry.forEach(async ({id, messaging ,timestamp}) => {
        let event = messaging[0]
        if(event.read){
          return;
        }
        this.facebook.notedAndTyping(event.sender.id);
        //this.facebook.notedAndTyping(event.sender.id, 'mark_seen');
        if(event.sender.id !== process.env.FB_PAGE_ID){
          this.receive(event);
        }
        this.facebook.notedAndTyping(event.sender.id, 'typing_off');
      })

      res.sendStatus(200);
    });

    app.get('/webhook', (req, res) => {
      if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
      } else {
        res.sendStatus(400);
      }
    });
  }

  //clean up maybe?
  close () {}

  getUser(data) {
    debugger
      return {
        id: data.sender,
        name: 'Sebastien Stettler'
      }
  }

  constructUserId(data){
    return `facebook-${data.sender.id}`;
  }

  buildMessageObject(data){
    if(data.read) {
      return new MessageRead(data.id);
    }
    if(data.quick_replies) {
      return new MessageIntent(data.payload);
    }
    if(data.sticker_id) {
      return new MessageSticker(data.sticker_id)
    }
    if(data.attachments){
      data.attachments.map( (attachment) => {
        if(attachment.type === 'image'){
          return new MessageImage(attachment.payload.url);
        } else {
          return new MessageAttachment(attachment.payload);
        }
      })
    }
    return new MessageText(data.message.text);
  }

  // if(event.quick_replies){
  //   response = this.robot.runIntent(data.payload)
  // }
    //response = this.robot.runIntent()
  //}
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

module.exports = AdapterFacebook;
