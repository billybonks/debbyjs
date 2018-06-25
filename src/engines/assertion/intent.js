const Intent = require('../../intent');

class IntentAssertion extends Intent {
  constructor(targetKlass) {
    super();
    this.target = targetKlass;
  }

  run() {
    return this.buildResponseFromKey(this.target.key);
  }
}

module.exports = IntentAssertion;
