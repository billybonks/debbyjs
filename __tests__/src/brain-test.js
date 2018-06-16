const EngineAssertion = require('../../src/engines/assertion');
const EngineRegex = require('../../src/engines/regex');
const IntentRegex = require('../../src/engines/regex/intent');
const IntentAssertion = require('../../src/engines/assertion/intent');
Subject = require('../../src/brain');
const i18n = require('i18n');
let subject = null;

describe('Unit | Brain', () => {
  describe('#constructor', () => {
    test('it works', () => {
      subject = new Subject();
      let engines = subject.engines.map( (engine) => { return engine.constructor; });
      expect(engines).toEqual([EngineAssertion, EngineRegex]);
    });
  });

  describe('instance functions', () => {
    beforeEach( () => {
      subject = new Subject({name: 'hello'});
    });

    afterEach( () => {
      subject = null;
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

    describe('#mount', () => {
      test('tries to mount on every engine', () => {
        class testAssertionIntent extends IntentAssertion {
          static get key(){
            return 2;
          }
        }
        subject.mount(IntentRegex);
        subject.mount(testAssertionIntent);
        expect(Object.keys(subject.engines[0].intentKeys)).toEqual(['2']);
        expect(subject.engines[1].regexClasses.length).toEqual(1);
      });
    });

    describe('#handleMessage', () => {
      let context, user, origTranslate;
      beforeEach(() => {
        context = {update:jest.fn()};
        user = {};
        origTranslate = i18n.__;
        i18n.__ = jest.fn(function(){ return arguments[0];});
      });

      afterEach(() => {
        i18n.__ = origTranslate;
      });

      test('if no message found uses fallback', async () => {
        let result = await subject.handleMessage({text: 'nothingness'}, user, context);
        expect(result).toMatchSnapshot();
      });

      test('if finds string uses it', async () => {
        let result = await subject.handleMessage({text: 'yes'}, user, context);
        expect(result).toMatchSnapshot();
      });

      test('if function executes it', async () => {
        class Greeter extends IntentRegex {
          static get regex(){
            return /\bhi\b|\bhello\b/i;
          }
          run(){
            return 'thebest.message';
          }
        }
        subject.mount(Greeter);
        let result = await subject.handleMessage({text: 'hello'}, user, context);
        expect(result).toMatchSnapshot();
      });
    });
  });
});


// async handleMessage(message, user, context){
//   let matchedKlass = this.engines.some( (engine) => {
//     return engine.match(message, user, context);
//   });
//
//   if(!matchedKlass){
//     matchedKlass = 'fallback';
//   }
//
//   let result = null;
//
//   if(typeof matchedKlass == 'function'){
//     let instance = new matchedKlass();
//     result = await instance.run(message, user, context);
//   } else {
//     result = {
//       response: i18n.__(matchedKlass, {sample:true}, {}),
//       context: {context: {lastMessage: null}}
//     };
//   }
//
//   if(result){
//     await context.update(user,result.context);
//     return result;
//   } else {
//     throw new Error('No response returned');
//   }
// }


// mount(intents){
//   this.engines.forEach((engine) => {
//     engine.mount(intents);
//   });
// }
