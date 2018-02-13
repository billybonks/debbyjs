const i18n = require('i18n');

class Bot {
  constructor(brain){
    this.name = brain.name;
    this.brain = brain;
    this.regexClasses = [];
    this.intentClasses = [];
  }

  configureI18n(dir){
    i18n.configure({
      locales:['en'],
      directory: dir,
      updateFiles: false,
    });

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
      this.mountHandler(klass);
    });
  }

  async handleMessage(message, user){
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
