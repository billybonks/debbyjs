const i18n = require('i18n');
const EngineAssertion = require('./engines/assertion');
const EngineRegex = require('./engines/regex');

class Bot {
  constructor(brain){
    this.name = brain.name;
    this.brain = brain;
    this.engines = [new EngineAssertion(), new EngineRegex()];
  }

  configureI18n(dir){
    i18n.configure({
      locales:['en'],
      directory: dir,
      updateFiles: false,
    });

  }

  mount(intents){
    this.engines.forEach((engine) => {
      engine.mount(intents);
    });
  }


  async handleMessage(message, user, context){
    let matchedKlass;
    for(let i=0; i < this.engines.length; i++){
      matchedKlass = this.engines[i].match(message, user, context);
      if(matchedKlass){
        break;
      }
    }

    if(!matchedKlass){
      matchedKlass = 'fallback';
    }

    let result = null;

    if(typeof matchedKlass == 'function'){
      let instance = new matchedKlass();
      result = await instance.run(message, user, context);
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
