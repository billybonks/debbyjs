require('../../helpers/intent')({
  match: ['fav', 'my fav', 'favourite'],
  dontMatch: ['favour', 'favorite']
});
