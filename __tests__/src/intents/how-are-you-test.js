require('../../helpers/intent')({
  match: ['how are you', 'how r u', 'how are you doing'],
  dontMatch: ['how u', 'how\'s life', 'how life', 'how is your work']
});
