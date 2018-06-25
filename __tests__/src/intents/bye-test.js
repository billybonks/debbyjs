require('../../helpers/intent')({
  match: ['bye', 'bye bye', 'byebye'],
  dontMatch: ['b ye']
});
