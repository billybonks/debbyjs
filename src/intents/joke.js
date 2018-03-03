const Intent = require('../intent');

class IntentJoke extends Intent {
  static get regex(){
    return /\bjoke\b/i;
  }

  static get key(){
    return 'banter.joke';
  }
}

module.exports = IntentJoke;
