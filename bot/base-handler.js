class BaseHandler{
  run(message, context, user){
    return {
      response: i18n.__(this.key, {sample:true}, {}),
      context: {},
      quickReplies: i18n.__({phrase:this.key, locale: 'quick_replies_en'})
    }
  }

}

module.exports = BaseHandler;
