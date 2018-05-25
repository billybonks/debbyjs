module.exports = {
  Bots: require('./src/bot'),
  Intents: require('./src/intents'),
  Messages: require('./src/messages'),
  HardDrive: require('./src/hard-drive'),
  Intent: require('./src/intent'),
  AssertionIntent: require('./src/engines/assertion/intent'),
  RegexIntent: require('./src/engines/regex/intent'),
  Brain: require('./src/brain'),
  User: require('./src/user'),
  Context: require('./src/context')

};
