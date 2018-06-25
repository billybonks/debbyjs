require('../../helpers/intent')({
  match: ['bored', 'boring', 'life is boring'],
  dontMatch: ['life is a bore', 'bor ed', 'b oring']
});
