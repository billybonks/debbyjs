function matchRegexs(message){
  let regexs = (Subject.regex instanceof Array) ? Subject.regex : [Subject.regex];
  return regexs.some((regex) => {
    return message.match(regex);
  });
}
module.exports = {
  validate(){
    describe('is a valid intent', () => {
      test('has a regex property', () => {
        expect(Subject.regex).toBeTruthy();
      });

      test('has a key', () => {
        expect(Subject.key).toBeTruthy();
      });
    });
  },
  validateMessages(messages){
    describe('assert messages matches', () => {
      messages.match.forEach((message) => {
        test(`"${message}" matches a regex`, () => {
          let matched = matchRegexs(message);
          expect(matched).toBe(true);
        });
      });
    });

    describe('assert messages dont match', () => {
      messages.dontMatch.forEach((message) => {
        test(`"${message}" doesn't match a regex`, () => {
          let matched = matchRegexs(message);
          expect(matched).toBe(false);
        });
      });
    });
  }
};
