const EngineBase = require('../base');
const RegexIntent = require('./intent');

class EngineRegex extends EngineBase {
  constructor() {
    super();
    this.regexClasses = [];
  }


  mountIntent(klass) {
    if(this.extendsKlass(klass, RegexIntent)){
      this.regexClasses.push(klass);
    }
  }

  match(message, user, context){
    return this.regexClasses.find( (klass) => {
      if(klass.requiredContext){
        if(!context){
          return;
        }
        if(klass.requiredContext && !klass.requiredContext.includes(context.lastMessage)){
          return;
        }
      }
      if(klass.regex instanceof Array){
        return klass.regex.find( (regex) => {
          return message.text.match(regex);
        });
      }
      return message.text.match(klass.regex);
    });
  }
}

module.exports = EngineRegex;
