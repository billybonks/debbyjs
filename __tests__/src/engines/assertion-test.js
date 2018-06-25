const describeClass = require('../../helpers/class');
const Intent = require('../../../src/engines/assertion/intent');

function assertRegex(method, strings){
  describe(`#${method}`, () => {
    test('Acccepts the follwing strings strings', () => {
      strings.forEach( (test) => {
        expect(test.match(subject[method])).toBeTruthy();
      });
    });
  });
}

describeClass(() => {
  assertRegex('assertionRegex', ['yes','can','please','yes please']);
  assertRegex('negationRegex', ['no','cannot','nevermind','cancel', 'no thankyou']);
  describe('#mountIntent', () => {
    describe('intent extends assertionIntent', () => {
      test('mounts intent', () => {
        class CustomIntent extends Intent {
          static get target(){
            return {key: 'hello_intent' };
          }
        }
        subject.mountIntent(CustomIntent);
        expect(Object.keys(subject.intentKeys).length).toEqual(1);
      });
    });
    describe('intent does not extend assertionIntent', () => {
      test('does not mount intent', () => {
        subject.mountIntent({a:2});
        expect(Object.keys(subject.intentKeys).length).toEqual(0);
      });
    });
  });
  describe('assertClass', () => {
    test('if no match returns fallback', () => {
      expect(subject.match({text:'yes'}, {}, {})).toEqual('fallback.assertion');
    });
    test('fails gracefully if no context', () => {
      expect(subject.match({text:'yes'})).toEqual('fallback.assertion');
    });
    test('if match returns intent', () => {
      let intent = class x{assertion(){}};
      subject.intentKeys = {best:intent};
      expect(subject.match({text:'yes'},{}, {lastMessage:'best'})).toEqual(intent);
    });
  });
});
