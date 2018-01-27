class Bot {
  constructor(name, brain){
    this.name = name;
    this.brain = brain;
    this.regexClasses = [];
    this.intentClasses = [];
    require('walkdir').sync('./bot/message-handlers').forEach((path) => {
      let klass = require(path);
      this.mountHandler(klass);
    })
  }

  mountIntent(klass) {
    if(klass.regex){
      this.regexClasses.push(klass);
    }
  }

  mountRegex(klass) {
    if(klass.intent){
      this.intentClasses.push(klass);
    }
  }

  mountHandler(klass) {
    this.mountRegex(klass);
    this.mountIntent(klass);
  }

  mount(handlers){
    handlers.forEach( (klass) => {
      mountHandler(klass)
    })
  }

  handleMessage(message){
    //run middlewares on message
    let matchedKlass = this.regexClasses.find( (klass) => {
      return message.text.match(klass.regex)
    })
    if(!matchedKlass){
      //search by intent
    }
    let result = null;
    if(matchedKlass){
      let instance = new matchedKlass();
      result = instance.run(message);
      return result

    }else {
      return result = {
        response: i18n.__('fallback', {sample:true}, {})
      }
    }
  }
}

module.exports = Bot;
