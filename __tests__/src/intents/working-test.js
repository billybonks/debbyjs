require('../../helpers/intent')({
  match: ['are you working', 'i am working', 'this is working'],
  dontMatch: ['ping']
});
