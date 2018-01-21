const { Router } = require('express');
const facebook = require('../../lib/facebook')
let api = Router();
let Bot = require('../../bot');

api.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

api.post('/webhook', (req, res) => {
  const data = req.body;
  if (data.object !== 'page') {
    return res.sendStatus(200);
  }
  data.entry.forEach(async ({id, messaging ,timestamp}) => {
    let event = messaging[0]
    if(event.read){
      //message read tracking event
      return
    }
    if(event.quick_replies){
      //short circut to option
    }
    if(event.sender.id !== process.env.FB_PAGE_ID){
      facebook.fbNotedAndTyping(event.sender.id, 'mark_seen');
      facebook.fbNotedAndTyping(event.sender.id);
      Bot.handleMessage(event);
      facebook.fbNotedAndTyping(event.sender.id, 'typing_off');
      return
    }
  })

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
  res.sendStatus(200);
});

module.exports = api;
//
//
//
//
// async processMessage(){
//   const sender = event.sender.id;
//   if (event.message && isValidMessage(event.message)) {
//     try {
//       await facebook.fbNotedAndTyping(sender, 'typing_on')
//       await Bot.handleMessage(sender, event.message);
//       await facebook.fbNotedAndTyping(sender, 'typing_off');
//     } catch(e){
//       facebook.fbTrackEvent({ _fbid_: sender }, `crashed: ${errors}`);
//       return callback({ errors, sender });
//     }
//   } else {
//     facebook.fbTrackEvent({ _fbid_: sender }, `User sent invalid message`);
//     facebook.fbBotResponse(sender, 'Facebook Location is broken leh, paiseh. Can you please just tell me your bus stop code, postal code, or name of place?')
//       .then(() => callback());
//   }
// }


/*
let context = await getUserContext(sender);
await messenger.handlePostback(event.postback, context);
await messagePromise(, context)
wit.cleanupUserContext
setUserContext
*/
