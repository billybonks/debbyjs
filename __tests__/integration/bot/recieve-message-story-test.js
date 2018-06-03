let Bot = require('../../../src/bot/slack');
let HardDrive = require('../../../src/hard-drive');
let Brain = require('../../../src/brain');
let Intent = require('../../../src/intents/greet');

describe('receive message story', () => {
  beforeEach( () => {
    this.hardDrive = new HardDrive('mrBot', {});
    this.brain = new Brain();
    this.brain.configureI18n('./locales');
    this.bot = new Bot({hardDrive: this.hardDrive, brain:this.brain});

  });

  let user = {id:59, github_user: 'billybonks', name:'sebastien'};
  let jsonUser = JSON.stringify(user);
  let message = {
    text:'hello',
    channel: 'thechat',
    user: 59,
    team: 'billybonks'
  };

  describe('When a message is recieved', () => {
    test('message gets called with user and context', () => {
      class MockIntent extends Intent {
        run(message, user, context){
          expect(context.constructor.name).toEqual('Context');
          expect(user.constructor.name).toEqual('User');
          return super.run(...arguments);
        }
      }
      this.brain.mount(MockIntent);
      this.bot.send = jest.fn();
      this.hardDrive.userStore.redis.get = jest.fn().mockReturnValue(jsonUser);
      this.hardDrive.contextStore.redis.set = jest.fn().mockReturnValue('OK');
      this.bot.receive(message);
    });

    test('user and context, update with correct ids', async () => {
      let userStore = this.hardDrive.userStore;
      let contextStore = this.hardDrive.contextStore;
      class MockIntent extends Intent {
        run(message, user, context){
          userStore.redis.set = jest.fn();
          contextStore.redis.set = jest.fn();
          user.update({
            id:999,
            number: 888,
            life: 'is good',
          });
          context.update({id:'extreme_mode', prosperityMode: true});
          return super.run(...arguments);
        }
      }
      this.brain.mount(MockIntent);
      this.bot.send = jest.fn();
      userStore.redis.get = jest.fn().mockReturnValue(jsonUser);
      contextStore.redis.set = jest.fn().mockReturnValue('OK');
      await this.bot.receive(message);
      expect(contextStore.redis.set.mock.calls).toMatchSnapshot();
      expect(userStore.redis.set.mock.calls).toMatchSnapshot();
    });
  });
});
