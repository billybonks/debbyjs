const describeClass = require('../../helpers/class');
const RegexIntent = require('../../../src/engines/regex/intent');

describeClass(() => {
  describe('#mountIntent', ()=> {
    test('it mounts if extends RegexIntent', () => {
      subject.mountIntent(RegexIntent);
      expect(subject.regexClasses.length).toEqual(1);
    });

    test('it does not mount if doesn\'t extend RegexIntent', () => {
      subject.mountIntent({asd:2});
      expect(subject.regexClasses.length).toEqual(0);
    });
  });

  describe('match', () => {
    let context = 'bot.contextBound';
    class RegexIntent { static get regex(){ return /\b(yes)\b/; }}
    class RegexArrayIntent { static get regex(){ return [/\b(na)\b/,/\b(ya)\b/ ]; }}
    class ContextBound extends RegexIntent { static get requiredContext(){ return context;}}
    const messageMatch = {text:'yes'};
    const messageMiss = {text:'non'};
    describe('Context bound intent', () => {
      beforeEach( () => {
        subject.regexClasses.push(ContextBound);
      });

      test('fails elegantly if no context provided', () => {
        let result = subject.match(messageMatch, {}, null);
        expect(result).toBeUndefined();
      });

      test('returns nothing if requirements are unmet', () => {
        let result = subject.match(messageMatch, {}, {});
        expect(result).toBeUndefined();
      });

      test('returns klass if requirements are met', () => {
        let result = subject.match(messageMatch, {}, {lastMessage: context});
        expect(result).toEqual(ContextBound);
      });

      test('tries context bound over non bound intents', () => {
        subject.regexClasses.push(RegexIntent);
        let result = subject.match(messageMatch, {}, {lastMessage: context});
        expect(result).toEqual(ContextBound);
      });
    });

    describe('regex intent', () => {
      beforeEach( () => {
        subject.regexClasses.push(RegexIntent);
      });

      describe('text matches', () => {
        test('returns class', () => {
          let result = subject.match(messageMatch);
          expect(result).toEqual(RegexIntent);
        });
      });

      describe('text misses', () => {
        test('returns null', () => {
          let result = subject.match(messageMiss);
          expect(result).toBeUndefined();
        });
      });
    });

    describe('regex intent with regexArray', () => {
      beforeEach( () => {
        subject.regexClasses.push(RegexArrayIntent);
      });

      describe('text matches', () => {
        test('returns class', () => {
          let result = subject.match({text:'na'});
          expect(result).toEqual(RegexArrayIntent);
          subject.match({text:'ya'});
          expect(result).toEqual(RegexArrayIntent);
        });
      });

      describe('text misses', () => {
        test('returns null', () => {
          let result = subject.match(messageMiss);
          expect(result).toBeUndefined();
        });
      });
    });
  });
});
