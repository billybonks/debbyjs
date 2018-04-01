require('../../helpers/intent')({
  match: ['how old are you', 'what\'s your age'], //'are you ver old'
  dontMatch: ['older', 'aager', 'a g e']//['how old is mandela', 'what\'s the age of the earth'],
});
