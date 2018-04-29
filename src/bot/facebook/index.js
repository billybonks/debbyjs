const Bot = require('../bot');
const Facebook = require('./client');
const { MessageText } = require('../../messages');
const MessageImage = require('../../messages/image');
const MessageIntent = require('../../messages/intent');
const MessageRead = require('../../messages/read');
const MessageSticker = require('../../messages/sticker');

class FacebookBot extends Bot {


  constructor(brain, {appId, accessToken}){
    super(brain);
    this.facebook = new Facebook(appId, accessToken);
  }

  send (messages) {
    let message = messages;
    this.facebook.botResponseText(message.room, message.response, message.quickReplies);
  }

  run (app) {
    app.post('/webhook', (req, res) => {
      const data = req.body;

      if (data.object !== 'page') {
        return res.sendStatus(200);
      }

      data.entry.forEach(async ({id, messaging ,timestamp}) => { // eslint-disable-line no-unused-vars
        let event = messaging[0];
        if(event.read){
          return;
        }
        this.facebook.notedAndTyping(event.sender.id);
        //this.facebook.notedAndTyping(event.sender.id, 'mark_seen');
        if(event.sender.id !== process.env.FB_PAGE_ID){
          this.receive(event);
        }
        this.facebook.notedAndTyping(event.sender.id, 'typing_off');
      });

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
    return {
      id: data.sender,
      name: 'Sebastien Stettler'
    };
  }

  constructUserId(data){
    return `facebook-${data.sender.id}`;
  }

  buildMessageObject(data){
    if(data.read) {
      return new MessageRead(data.id, data.sender.id, data.sender.id);
    }
    if(data.quick_replies) {
      return new MessageIntent(data.payload, data.sender.id, data.sender.id);
    }
    if(data.sticker_id) {
      return new MessageSticker(data.sticker_id, data.sender.id, data.sender.id);
    }
    if(data.attachments){
      data.attachments.map( (attachment) => {
        if(attachment.type === 'image'){
          return new MessageImage(attachment.payload.url, data.sender.id, data.sender.id);
        } else {
          //return new MessageAttachment(data.sender.id, data.sender.id, attachment.payload);
        }
      });
    }
    return new MessageText(data.message.text, data.sender.id, data.sender.id);
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

module.exports = FacebookBot;
