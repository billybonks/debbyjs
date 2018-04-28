const RegexIntent = require('../engines/regex/intent');

class IntentJoke extends RegexIntent {
  static get regex(){
    return /\bjoke\b/i;
  }

  static get key(){
    return 'banter.joke';
  }
}

module.exports = IntentJoke;
