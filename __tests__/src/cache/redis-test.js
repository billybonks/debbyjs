const Redis = require('ioredis');
const describeClass = require('../../helpers/class');

describeClass( () => {
  describe('constructor',() => {
    test('proxies properties', () => {
      class Test {}
      const name = 'billybonks';
      const expiry = 600;

      let subject = new Subject(name, {} , expiry, Test);
      expect(subject.name).toEqual(name);
      expect(subject.redis instanceof Redis).toEqual(true);
      expect(subject.expiry).toEqual(expiry);
      expect(subject.klass).toEqual(Test);
    });
  });
});
