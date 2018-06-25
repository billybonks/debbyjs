require('../../helpers/intent')({
  match: ['are you human', 'you robot?', 'am i talking to a machine', 'is this an app', 'are you a program', 'real'],
  dontMatch: ['...']
});
