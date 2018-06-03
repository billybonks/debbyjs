let Bot = require('../../../src/bot/bot');
let HardDrive = require('../../../src/hard-drive');

describe('context management story', () => {
  beforeEach( () => {
    this.hardDrive = new HardDrive('asd', {});
    this.bot = new Bot({hardDrive: this.hardDrive});
  });
  describe('As a user', () => {
    let context = { lastMessage: 'lifeIsGood' };
    let jsonContext = JSON.stringify(context);
    describe('that already has a conversation context', () => {
      test('fetches and returns context', async () => {
        this.hardDrive.contextStore.redis.get = jest.fn().mockReturnValue(jsonContext);
        this.hardDrive.saveContext = jest.fn();
        let context = await this.bot.findOrCreateContext(12);
        expect(this.hardDrive.saveContext).not.toBeCalled();
        expect(this.hardDrive.contextStore.redis.get).toHaveBeenCalledWith('asd-context-12');
        expect(context._data).toMatchSnapshot();
        expect(context.constructor.name).toMatchSnapshot();
      });

      test('uses correct id when updating context', () => {

      });
    });

    describe('that doesn\t have a conversation context', () => {
      test('creates a default context', async () => {
        this.hardDrive.contextStore.redis.get = jest.fn();
        this.hardDrive.contextStore.redis.set = jest.fn();
        let context = await this.bot.findOrCreateContext(12);
        expect(this.hardDrive.contextStore.redis.set).toHaveBeenCalledWith('asd-context-12','{}','EX',600);
        expect(context._data).toMatchSnapshot();
        expect(context.constructor.name).toMatchSnapshot();
      });
    });
  });
});
