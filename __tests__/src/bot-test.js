const EngineAssertion = require('../../src/engines/assertion');
const EngineRegex = require('../../src/engines/regex');
const IntentRegex = require('../../src/engines/regex/intent');
const IntentAssertion = require('../../src/engines/assertion/intent');
Subject = require('../../src/bot');
const i18n = require('i18n');
let subject = null;

describe('Unit | Bot', () => {
  describe('#constructor', () => {
    test('it works', () => {
      let brain = {name: 'hello'};
      subject = new Subject(brain);
      expect(subject.name).toEqual('hello');
      expect(subject.brain).toEqual(brain);
      let engines = subject.engines.map( (engine) => { return engine.constructor; });
      expect(engines).toEqual([EngineAssertion, EngineRegex]);
    });
  });

  describe('instance functions', () => {
    beforeEach( () => {
      subject = new Subject({name: 'hello'});
    });

    describe('#configureI18n', () => {
      test('calls i18n.configure with correct paramters', () => {
        let orig = i18n.configure;
        i18n.configure = jest.fn();
        subject.configureI18n('asd');
        expect(i18n.configure).toBeCalledWith({
          locales:['en'],
          directory: 'asd',
          updateFiles: false,
        });
        i18n.configure = orig;
      });
    });
  });

  describe('#mount', () => {
    test('tries to mount on every engine', () => {
      subject.mount(new IntentRegex());
      subject.mount(new IntentAssertion({key:2}));
      expect(Object.keys(subject.engines[0].intentKeys)).toEqual(['2']);
      expect(subject.engines[1].regexClasses.length).toEqual(1);
    });
  });

  describe('#handleMessage', () => {
    let context, user;
    beforeEach(() => {
      context = {update:jest.fn()}
      user = {}
    });

    test('if no message found uses fallback', async () => {
      result = await subject.handleMessage('nothingness', {}, context);
    });
  });
});


async handleMessage(message, user, context){
  let matchedKlass = this.engines.some( (engine) => {
    return engine.match(message, user, context);
  });

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


// mount(intents){
//   this.engines.forEach((engine) => {
//     engine.mount(intents);
//   });
// }
