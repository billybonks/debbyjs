require('../../helpers/intent')({
  match: ['thanks', 'thnx', 'tq'],
  dontMatch: ['tanks', 'thn', 'ty']
});
