module.exports = {
  Adapters: require('./src/adapter'),
  Intents: require('./src/intents'),
  Messages: require('./src/messages'),
  HardDrive: require('./src/hard-drive'),
  Intent: require('./src/intent'),
  AssertionIntent: require('./src/engines/assertion/intent'),
  RegexIntent: require('./src/engines/regex/intent'),
  Bot: require('./src/bot'),
  User: require('./src/user'),
  Context: require('./src/context')

};
