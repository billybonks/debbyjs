require('../../helpers/intent')({
  match: ['tell me a joke', 'you are a joke', 'life is a joke'],
  dontMatch: ['i want to laugh', 'tell me something funny']
});
