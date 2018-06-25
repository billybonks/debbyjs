const describeClass = require('../helpers/class');
const i18n = require('i18n');

describeClass(() => {
  beforeEach( () => {
    class TestTent extends Subject  {
      static get key(){
        return 'test.key';
      }

      static get invalidKey(){
        return 'test.invalidKey';
      }

      static get assertionKey(){
        return 'test.assertionKey';
      }
    }
    Subject  = TestTent;
    subject = new TestTent();
  });

  describe('#buildResponseFromKey', () => {
    let orig;
    afterEach(() => {
      i18n.__ = orig;
    });
    
    beforeEach(() => {
      orig = i18n.__;
      i18n.__ = jest.fn();
    });

    test('samples response', () => {
      subject.buildResponseFromKey('test.key');
      expect(i18n.__.mock.calls[0][1].sample).toEqual(true);
    });

    test('default returned context is lastMessage', () => {
      let result = subject.buildResponseFromKey('test.key');
      expect(result.context).toEqual({ lastMessage: 'test.key' });
    });

    test('uses can customise last message', () => {
      let context =  'message.lastOfAll';
      let result = subject.buildResponseFromKey('test.key',{}, context);
      expect(result.context).toEqual({lastMessage:context});
    });
  });

  describe('#run', () => {
    test('calls #buildResponseFromKey with extended key',  () => {
      subject.buildResponseFromKey = jest.fn();
      subject.run();
      expect(subject.buildResponseFromKey.mock.calls.length).toEqual(1);
      expect(subject.buildResponseFromKey.mock.calls[0]).toEqual(['test.key']);
    });
  });

  describe('#keys', () => {
    test('returns extended keys', () => {
      expect(Subject.keys).toEqual(['test.key', 'test.invalidKey', 'test.assertionKey']);
    });

  });
});
