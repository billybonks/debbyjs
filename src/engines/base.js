class EngineBase {
  mount(handlers){
    if(!( handlers instanceof Array)) {
      handlers = [handlers];
    }
    handlers.forEach( (klass) => {
      this.mountIntent(klass);
    });
  }

  mountIntent() {
    throw new Error('Not Implemented');
  }

  match() {
    throw new Error('Not Implemented');
  }

  extendsKlass(klass, test){
    let currentProto = klass;
    let matched;
    while(currentProto.__proto__ && !matched) {
      matched = currentProto === test;
      currentProto = currentProto.__proto__;
    }
    return matched;
  }
}

module.exports = EngineBase;
