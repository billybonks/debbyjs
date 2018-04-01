const describeClass = require('./class');

module.exports = function(params =[]){
  describeClass(() => {
    test('#constructor', () => {
      let paramKeys = Object.keys(params);
      let paramValues = paramKeys.map( (key) => {
        return params[key];
      });
      let user = {};
      let s = new Subject(user, 'room', ...paramValues);
      expect(s.user).toEqual(user);
      expect(s.room).toEqual('room');
      paramKeys.forEach( (key) => {
        expect(s[key]).toEqual(params[key]);
      });
    });
  });
};
