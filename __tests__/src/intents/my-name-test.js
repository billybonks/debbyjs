require('../../helpers/intent')({
  match: ['what\'s my name', 'my name'],
  dontMatch: ['your name', 'name']
});
