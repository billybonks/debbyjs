let Adapter = require('../../../src/bot/bot');
let HardDrive = require('../../../src/hard-drive');
let User = require('../../../src/user');
let Context = require('../../../src/context');

describe('Integration | Adapter -> hard-drive', () => {
  beforeEach( () => {
    // this.robot = {brain: };
    this.hardDrive = new HardDrive('asd', {});
    this.adapter = new Adapter({hardDrive: this.hardDrive});
    this.adapter.getUser = function() { return {id:12, name:'seb'};};
  });

  describe('#findOrCreateUser', () => {
    afterEach( async () => {
      await this.hardDrive.userStore.redis.del('asd-12');
      this.hardDrive.saveUser.mockRestore();
    });

    beforeEach( async () => {
      jest.spyOn(this.hardDrive, 'saveUser');
    });
    describe('no user', () => {
      it('creates a new one', async () => {
        let result = await this.adapter.findOrCreateUser(12);
        expect(result instanceof User ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.data).toMatchSnapshot();
        let success = await result.store.redis.del('asd-12');
        expect(success).toEqual(1);
        expect(this.hardDrive.saveUser).toBeCalled();
      });
    });

    describe('user exists', () => {
      beforeEach(async () => {
        await this.hardDrive.userStore.redis.set('asd-12',
          JSON.stringify({id: 12, someState: 'hello'}), 'EX', 100);
        jest.spyOn(this.hardDrive, 'getUser');
      });

      afterEach( async () => {
        this.hardDrive.getUser.mockRestore();
      });

      it('finds and returns expected hash', async () => {
        let result = await this.adapter.findOrCreateUser(12);
        expect(result instanceof User ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.id).toEqual(12);
        expect(result._data).toEqual({id: 12, someState: 'hello'});
        expect(this.hardDrive.getUser).toBeCalled();
        expect(this.hardDrive.saveUser).not.toBeCalled();
      });

      test('able to update the context', async () => {
        let result = await this.adapter.findOrCreateUser(12);
        expect(result.properties).toEqual({ id:12, someState: 'hello' });
        result.set('extraInfo', 'works');
        await result.update();
        result = await this.adapter.findOrCreateUser(12);
        expect(result.properties).toEqual({ id:12, someState: 'hello', extraInfo: 'works' });
      });
    });
  });

  describe('#findOrCreateContext', () => {
    afterEach( async () => {
      await this.hardDrive.userStore.redis.del('asd-context-12');
      this.hardDrive.saveContext.mockRestore();
    });
    beforeEach( async () => {
      jest.spyOn(this.hardDrive, 'saveContext');
    });
    describe('no context', () => {
      it('creates a new one', async () => {
        let result = await this.adapter.findOrCreateContext(12);
        expect(result instanceof Context ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.userId).toEqual(12);
        let success = await result.store.redis.del('asd-context-12');
        expect(success).toEqual(1);
        expect(this.hardDrive.saveContext).toBeCalled();
      });
    });

    describe('context exists', () => {
      beforeEach(async () => {
        await this.hardDrive.userStore.redis.set('asd-context-12',
          JSON.stringify({someState: 'hello'}), 'EX', 100);
        jest.spyOn(this.hardDrive, 'getContext');
      });

      afterEach( async () => {
        this.hardDrive.getContext.mockRestore();
      });

      it('finds and returns expected hash', async () => {
        let result = await this.adapter.findOrCreateContext(12);
        expect(result instanceof Context ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.userId).toEqual(12);
        expect(result._data).toEqual({someState: 'hello'});
        expect(this.hardDrive.getContext).toBeCalled();
        expect(this.hardDrive.saveContext).not.toBeCalled();
      });

      test('able to update the context', async () => {
        let result = await this.adapter.findOrCreateContext(12);
        expect(result.properties).toEqual({ someState: 'hello' });
        result.set('extraInfo', 'works');
        await result.update();
        result = await this.adapter.findOrCreateContext(12);
        expect(result.properties).toEqual({ someState: 'hello', extraInfo: 'works' });
      });
    });
  });
});
