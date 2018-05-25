const EngineBase = require('../base');
const AssertionIntent = require('./intent');

class EngineRegex extends EngineBase {
  constructor() {
    super();
    this.intentKeys = {};
  }

  mountIntent(klass) {
    if(this.extendsKlass(klass, AssertionIntent)){
      this.intentKeys[klass.key] = klass;
    }
  }

  assertClass(message, user, context, type, regex){
    let matchedKlass = null;
    let fallback = `fallback.${type}`;
    if(message.text.match(regex)){
      if(context){
        matchedKlass = this.intentKeys[context.lastMessage];
        if(matchedKlass) {
          return matchedKlass;
        }
      }
      return fallback;
    }
  }


  get assertionRegex(){
    return /(\b(yes|can|please|yes please)\b)/gi;
  }

  get negationRegex(){
    return /(\b(no|cannot|nevermind|cancel|no thankyou)\b)/gi;
  }

  match(message, user, context){
    let matchedKlass = this.assertClass(message, user, context, 'assertion', this.assertionRegex);
    if(!matchedKlass){
      matchedKlass = this.assertClass(message, user, context, 'negation', this.negationRegex);
    }
    return matchedKlass;
  }
}

module.exports = EngineRegex;
