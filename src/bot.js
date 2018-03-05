const i18n = require('i18n');

class Bot {
  constructor(brain){
    this.name = brain.name;
    this.brain = brain;
    this.regexClasses = [];
    this.intentClasses = [];
    this.intentKeys = {};
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

  mountKeyToIntent(klass){
    if(klass.keys){
      klass.keys.forEach( (key) => {
        if(key){
          this.intentKeys[key] = klass;
        }
      });
    }
  }
  mountHandler(klass) {
    this.mountKeyToIntent(klass);
    this.mountRegex(klass);
    this.mountIntent(klass);
  }

  mount(handlers){
    handlers.forEach( (klass) => {
      this.mountHandler(klass);
    });
  }

  assertClass(message, user, context, type, regex){
    let matchedKlass = null;
    let fallback = `fallback.${type}`;
    if(message.text.match(regex)){
      matchedKlass = this.intentKeys[context.lastMessage];
      if(matchedKlass && matchedKlass.prototype[type]) {
        return matchedKlass;
      } else {
        return fallback;
      }
    }
  }

  async handleMessage(message, user, context){
    let matchedKlass = null;
    let func = 'run';
    matchedKlass = this.assertClass(message, user, context, 'assertion', /(\b(yes|can|please|yes please)\b)/gi);
    if(matchedKlass){
      func = 'assertion';
    } else  {
      matchedKlass = this.assertClass(message, user, context, 'negation', /(\b(no|cannot|nevermind|cancel|no thankyou)\b)/gi);
      if(matchedKlass){
        func = 'negation';
      }
    }

    //run middlewares on message
    if(!matchedKlass){
      matchedKlass = this.regexClasses.find( (klass) => {
        if(klass.requiredContext){
          if(!context){
            return;
          }
          if(klass.requiredContext && !klass.requiredContext.includes(context.lastMessage)){
            return;
          }
        }
        if(klass.regex instanceof Array){
          return klass.regex.some( (regex) => {
            return message.text.match(regex);
          });
        }
        return message.text.match(klass.regex);
      });
    }

    if(!matchedKlass){
      //search by intent
    }

    if(!matchedKlass){
      matchedKlass = 'fallback';
    }

    let result = null;

    if(typeof matchedKlass == 'function'){
      let instance = new matchedKlass();
      result = await instance[func](message, user, context);
    } else {
      result = {
        response: i18n.__(matchedKlass, {sample:true}, {}),
        context: {context: {lastMessage: null}}
      };
    }

    if(result){
      await context.update(user,result.context);
      return result;
    } else {
      throw new Error('No response returned');
    }
  }
}

module.exports = Bot;
