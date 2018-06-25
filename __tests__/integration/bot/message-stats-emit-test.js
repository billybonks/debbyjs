let Bot = require('../../../src/bot/bot');
let HardDrive = require('../../../src/hard-drive');
let Brain = require('../../../src/brain');
let Greeting = require('../../../src/intents/greet');

let uuidMatcher = /^[0-9A-z]{8}-[0-9A-z]{4}-[0-9A-z]{4}-[0-9A-z]{4}-[0-9A-z]{12}\b/;
let context = {
  lastMessage: 'awesome.qq',
  update() {

  }
};
let user = {
  id: 12,
  name: 'bob',
  update() {
  }
};

let message = {
  message : 'abc'
};

function toBeCalledWithIdempotencyToken(mock, args) {
  let callArgs = mock.mock.calls[0];
  expect(callArgs[0].match(uuidMatcher)).toBeTruthy();
  expect(callArgs).toContain(args);
}

function resultToEqual(mock, obj) {
  let callArgs = mock.mock.calls[0];
  expect(callArgs[0].match(uuidMatcher)).toBeTruthy();
  expect(callArgs[1]).toEqual(obj);
}

describe('Stat emitting story', () => {
  beforeEach( () => {
    this.hardDrive = new HardDrive('mrBot', {});
    this.brain = new Brain();
    this.brain.configureI18n('./locales');
    this.bot = new Bot({hardDrive: this.hardDrive, brain:this.brain});
    this.messageRecieved = jest.fn();
    this.userFound = jest.fn();
    this.messageProcessed = jest.fn();
    this.bot.findOrCreateUser  = jest.fn().mockReturnValue(user);
    this.bot.findOrCreateContext  = jest.fn().mockReturnValue(context);
    this.bot.on('message_recieved', this.messageRecieved);
    this.bot.on('user_found', this.userFound);
    this.bot.on('message_processed', this.messageProcessed);
  });

  test('when a message function is matched', async () => {
    this.brain.engines[0].match = function() {
      return Greeting;
    };
    await this.bot.receive(message);
    toBeCalledWithIdempotencyToken(this.messageRecieved, message);
    toBeCalledWithIdempotencyToken(this.userFound, user, context);
    let expectedresult = {'context': {'lastMessage': 'banter.greet'}, 'quickReplies': 'banter.greet', 'response': 'banter.greet', 'matchedHandler': 'banter.greet'};
    resultToEqual(this.messageProcessed, expectedresult);
  });
});
