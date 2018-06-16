const describeClass = require('../../../helpers/class');

class AssertedIntent {
  static get key(){ return 'assertedIntent'; }
  static get regex(){ return [/\b(na)\b/,/\b(ya)\b/ ]; }
}

describeClass( () => {
  describe('#constructor', () => {
    test('sets targetObject', () => {
      let subject = new Subject(AssertedIntent);
      expect(subject.target).toEqual(AssertedIntent);
    });
  });

  describe('#run', () => {
    test('returns expected hash', () => {
      const i18n = require('i18n');
      let orig = i18n.__;
      i18n.__ = jest.fn(function(){
        if( arguments[0].phrase) {
          return arguments[0].phrase;
        }
        return arguments[0];
      });
      let subject = new Subject(AssertedIntent);
      let results = subject.run();
      expect(results).toMatchSnapshot();
      i18n.__ == orig;
    });
  });
});
