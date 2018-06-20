let Bot = require('../../../src/bot/bot');
let HardDrive = require('../../../src/hard-drive');
let Brain = require('../../../src/brain');

describe('error story', () => {
  beforeEach( () => {
    this.hardDrive = new HardDrive('mrBot', {});
    this.brain = new Brain();
    this.brain.configureI18n('./locales');
    this.bot = new Bot({hardDrive: this.hardDrive, brain:this.brain});
    this.errorSpy = jest.fn();
    Object.defineProperty(this.brain, 'fallbackMessage', {
      get: function () { return 'fallbackMock'; },
    });
    this.bot.on('error', this.errorSpy);
  });

  describe('when in bot function', () => {

    test('#constructUserId', async () => {
      let y = new Error('constructUserId');
      this.bot.constructUserId  = jest.fn().mockImplementation(function() {
        throw y;
      });
      await this.bot.receive({});
      expect(this.errorSpy).toBeCalledWith(y);
    });
    test('#findOrCreateUser', async () => {
      let y = new Error('findOrCreateUser');
      this.bot.findOrCreateUser  = jest.fn().mockRejectedValue(y);
      await this.bot.receive({});
      expect(this.errorSpy).toBeCalledWith(y);
    });

    test('#findOrCreateContext', async () => {
      let y = new Error('findOrCreateContext');
      this.bot.findOrCreateUser  = jest.fn();
      this.bot.findOrCreateContext  = jest.fn().mockRejectedValue(y);
      await this.bot.receive({});
      expect(this.errorSpy).toBeCalledWith(y);
    });
    //need to build a test to make sure fallback is called
    // these skipped tests noeed to go to an adatper test
    describe.skip('when message is returned', () => {
      beforeEach(() => {
        this.message = {
          buildResponse(){}
        };
        this.bot.findOrCreateUser  = jest.fn();
        this.bot.findOrCreateContext  = jest.fn();
        this.brain.handleMessage = jest.fn().mockReturnValue('asd');
      });

      test('#buildResponse', async () => {
        let y = new Error('buildResponse');
        this.bot.send = jest.fn();
        this.bot.buildResponse = jest.fn().mockImplementation(function() {
          throw y;
        });
        this.bot.buildMessageObject = jest.fn().mockReturnValue({});
        await this.bot.receive({});
        expect(this.errorSpy).toBeCalledWith(y);
      });

      test('#send', async () => {
        this.bot.buildMessageObject = jest.fn().mockReturnValue({});
        this.bot.brain.handleMessage = jest.fn();
        this.bot.buildResponse = jest.fn();
        let y = new Error('send');
        this.bot.send = jest.fn().mockRejectedValue(y);
        await this.bot.receive({});
        expect(this.errorSpy).toBeCalledWith(y);
      });
    });

  });

  describe('when in brain function', () => {
    beforeEach(() => {
      this.bot.findOrCreateUser  = jest.fn();
      this.bot.findOrCreateContext  = jest.fn();
      this.bot.buildMessageObject = jest.fn().mockReturnValue({});
    });

    test('#handleMessage', async () => {
      let y = new Error('handleMessage');
      this.brain.handleMessage = jest.fn().mockRejectedValue(y);
      await this.bot.receive({});
      expect(this.errorSpy).toBeCalledWith(y);
    });

    describe('when in engine', () => {
      test('#match', async () => {
        let y = new Error('match');
        this.brain.engines[0].match = jest.fn().mockImplementation(function() {
          throw y;
        });
        await this.bot.receive({});
        expect(this.errorSpy).toBeCalledWith(y);
      });
    });

    describe('when in message handler', () => {
      test('#run', async () => {
        let y = new Error('match');
        this.brain.engines[0].match = function() {
          return class x {
            run(){
              throw y;
            }
          };
        };
        await this.bot.receive({});
        expect(this.errorSpy).toBeCalledWith(y);
      });
    });

    describe('when in i18n', () => {
      test('__', async () => {
        let y = new Error('__');
        this.brain.engines[0].match = function() {
          return 'asd';
        };
        const i18n = require('i18n');
        let orig = i18n.__;
        i18n.__ = function() {
          throw y;
        };
        await this.bot.receive({});
        expect(this.errorSpy).toBeCalledWith(y);
        i18n.__ = orig;
      });
    });

    describe('when in context', () => {
      test('update', async () => {
        let y = new Error('update');
        this.bot.findOrCreateContext  = jest.fn().mockReturnValue({
          update(){
            throw y;
          }
        });
        this.brain.engines[0].match = function() {
          return 'asd';
        };
        await this.bot.receive({});
        expect(this.errorSpy).toBeCalledWith(y);
      });
    });
  });
});
