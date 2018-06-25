require('../../helpers/intent')({
  match: ['i want a taxi', 'get me an uber', 'can you help me hail a cab', 'what is a grab', 'grab me a bus'],
  dontMatch: ['...']
});
