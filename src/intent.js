const i18n = require('i18n');

class Intent{

  buildResponseFromKey(key, options, context){
    return {
      response: i18n.__(key, {sample:true}, options || {}),
      context: { lastMessage: context || key},
      quickReplies: i18n.__({phrase:key, locale: 'quick_replies_en'}),
    };
  }

  buildResponse(key, options, context, response){
    return {
      response: response,
      context: { lastMessage: context || key},
    };
  }


  run(){
    return this.buildResponseFromKey(this.constructor.key);
  }

  static get keys() {
    return [this.key, this.invalidKey, this.assertionKey];
  }

}

module.exports = Intent;
