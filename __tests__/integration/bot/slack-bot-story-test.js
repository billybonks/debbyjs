let SlackBot = require('../../../src/bot/slack');
let HardDrive = require('../../../src/hard-drive');
let Brain = require('../../../src/brain');
let RegexIntent = require('../../../src/engines/regex/intent');

describe('slack-bot-story', () => {
  beforeEach( () => {
    this.message = {
      channel:'D3JPALG68',
      client_msg_id: 'ebf78e8d-7dff-4e57-91b8-b9a616b66783',
      event_ts:'1529057247.000014',
      team:'T0W5JF9AT',
      text:'asd',
      ts:'1529057247.000014',
      type:'message',
      user:'U0W5NLY64',
    };
    this.hardDrive = new HardDrive('mrBot', {});
    this.brain = new Brain();
    this.brain.configureI18n('./locales');
    this.bot = new SlackBot({hardDrive: this.hardDrive, brain:this.brain, options:{}});
    this.bot.client.connect = jest.fn();
    this.bot.run();
  });

  test('if message is from a bot ignore', () => {
    this.message.bot_id = 'asd123';
    this.bot.receive = jest.fn();
    this.bot.client.messageWrapper(this.message);
    expect(this.bot.receive).not.toBeCalled();
  });

  describe('if from a user', () => {

    test('recieve called with expected params', () => {
      this.bot.receive = jest.fn();
      this.bot.client.messageWrapper(this.message);
      expect(this.bot.receive).toBeCalledWith({
        channel: 'D3JPALG68',
        client_msg_id: 'ebf78e8d-7dff-4e57-91b8-b9a616b66783',
        event_ts: '1529057247.000014',
        rawText: 'asd',
        team: 'T0W5JF9AT',
        text: 'asd',
        ts: '1529057247.000014',
        type: 'message',
        user: 'U0W5NLY64',
      });
    });

    describe('core functions get called as expected', () => {
      beforeEach(() => {
        this.bot.findOrCreateUser = jest.fn();
        this.bot.findOrCreateContext = jest.fn();
      });
      describe('message handling functions', () => {

        beforeEach(() => {
          this.mockReturn = {
            id:2,
            update(){}
          };
          this.bot.findOrCreateUser.mockReturnValue(this.mockReturn);
          this.bot.findOrCreateContext.mockReturnValue(this.mockReturn);
        });

        test('handleMessage gets called with expected params', async () => {
          this.bot.send = jest.fn();
          this.brain.handleMessage = jest.fn();
          this.bot.buildResponse = jest.fn();
          this.bot.send = jest.fn();
          await this.bot.client.messageWrapper(this.message);
          let expectedMessageHash = {_raw:
            {
              channel: 'D3JPALG68',
              client_msg_id: 'ebf78e8d-7dff-4e57-91b8-b9a616b66783',
              event_ts: '1529057247.000014',
              rawText: 'asd', team: 'T0W5JF9AT',
              text: 'asd',
              ts: '1529057247.000014',
              type: 'message',
              user: 'U0W5NLY64'
            },
          room: 'D3JPALG68',
          text: 'asd',
          user: 'U0W5NLY64'
          };
          expect(this.brain.handleMessage).toBeCalledWith(expectedMessageHash, this.mockReturn,this.mockReturn);
        });

        test('slack web client recieves correct parameters', async () => {
          class asdIntent extends RegexIntent {
            static get regex(){
              return /\basd\b/i;
            }

            static get key(){
              return 'banter.greet';
            }
          }
          this.brain.mount(asdIntent);
          this.bot.client.web.chat.postMessage = jest.fn();
          await this.bot.client.messageWrapper(this.message);
          expect(this.bot.client.web.chat.postMessage).toBeCalledWith(
            'D3JPALG68',
            'banter.greet',
            {
              as_user: true,
              link_names: 1,
              room: 'D3JPALG68',
              text: 'banter.greet',
              thread_ts: undefined,
              user: 'U0W5NLY64',
            },
          );
        });
      });

      describe('findFunctions', () => {
        beforeEach(() => {
          this.bot.send = jest.fn();
          this.bot.buildResponse = jest.fn();
          this.bot.brain.handleMessage = jest.fn();
        });

        test('findOrCreateUser to be called with expected params', async () => {
          await this.bot.client.messageWrapper(this.message);
          expect(this.bot.findOrCreateUser).toBeCalledWith('slack-T0W5JF9AT_U0W5NLY64', {
            channel: 'D3JPALG68',
            client_msg_id: 'ebf78e8d-7dff-4e57-91b8-b9a616b66783',
            event_ts: '1529057247.000014',
            rawText: 'asd',
            team: 'T0W5JF9AT',
            text: 'asd',
            ts: '1529057247.000014',
            type: 'message',
            user: 'U0W5NLY64',
          });
        });

        test('findOrCreateContext gets called with expected id', async () => {
          await this.bot.client.messageWrapper(this.message);
          expect(this.bot.findOrCreateContext).toBeCalledWith('slack-T0W5JF9AT_U0W5NLY64');
        });
      });
    });

  });
});
