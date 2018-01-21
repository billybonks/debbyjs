let regexClasses = [];
let intentClasses = [];
let facebook = require('../lib/facebook');

require('walkdir').sync('./bot/message-handlers').forEach(function(path){
  klass = require(path);
  mountHandler(klass);
})

function mountHandler(klass) {
  mountRegex(klass);
  mountIntent(klass);
}

function mountRegex(klass) {
  if(klass.intent){
    intentClasses.push(klass);
  }
}

function mountIntent(klass) {
  if(klass.regex){
    regexClasses.push(klass);
  }
}

class Bot {

  static mount(handlers){
    handlers.forEach( (klass) => {
      mountHandler(klass)
    })
  }

  static handleMessage({message, recipient, sender, timestamp}){
    let matchedKlass = regexClasses.find( (klass) => {
      return message.text.match(klass.regex)
    })
    if(!matchedKlass){
      //search by intent
    }
    let result = null;
    if(matchedKlass){
      let instance = new matchedKlass();
      result = instance.run(message);
      // store result.context

    }else {
      result = {
        response: i18n.__('fallback', {sample:true}, {})
      }
    }

    facebook.fbBotResponse(sender.id, result.response, result.quickReplies);
  }
}

module.exports = Bot;
