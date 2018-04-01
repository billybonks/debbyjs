const describeClass = require('../../helpers/class');

describeClass(() => {
  describe('#buildResponse', () => {
    test.skip('handles bare strings');

    test('returns expectedValue', () => {
      let subject = new Subject('a', 'b');
      let response = subject.buildResponse({response:'hello'});
      expect(response).toEqual({
        user: 'a',
        room: 'b',
        text: 'hello'
      });
    });
  });
});
