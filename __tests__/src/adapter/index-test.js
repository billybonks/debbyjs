let Adapter = require('../../../src/adapter/adapter');
let Brain = require('../../../src/brain');
let User = require('../../../src/user');
let Context = require('../../../src/context');

describe('Integration | Adapter -> Brain', () => {
  beforeEach( () => {
    this.robot = {brain: new Brain('asd', {})};
    this.adapter = new Adapter(this.robot);
    this.adapter.getUser = function() { return {id:12, name:'seb'};};
  });

  describe('#findOrCreateUser', () => {
    afterEach( async () => {
      await this.robot.brain.userStore.redis.del('asd-12');
      this.robot.brain.saveUser.mockRestore();
    });

    beforeEach( async () => {
      jest.spyOn(this.robot.brain, 'saveUser');
    });
    describe('no user', () => {
      it('creates a new one', async () => {
        let result = await this.adapter.findOrCreateUser(12);
        expect(result instanceof User ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.data).toMatchSnapshot();
        let success = await result.store.redis.del('asd-12');
        expect(success).toEqual(1);
        expect(this.robot.brain.saveUser).toBeCalled();
      });
    });

    describe('user exists', () => {
      beforeEach(async () => {
        await this.robot.brain.userStore.redis.set('asd-12',
          JSON.stringify({id: 12, someState: 'hello'}), 'EX', 100);
        jest.spyOn(this.robot.brain, 'getUser');
      });

      afterEach( async () => {
        this.robot.brain.getUser.mockRestore();
      });

      it('finds and returns expected hash', async () => {
        let result = await this.adapter.findOrCreateUser(12);
        expect(result instanceof User ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.id).toEqual(12);
        expect(result._data).toEqual({id: 12, someState: 'hello'});
        expect(this.robot.brain.getUser).toBeCalled();
        expect(this.robot.brain.saveUser).not.toBeCalled();
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
      await this.robot.brain.userStore.redis.del('asd-context-12');
      this.robot.brain.saveContext.mockRestore();
    });
    beforeEach( async () => {
      jest.spyOn(this.robot.brain, 'saveContext');
    });
    describe('no context', () => {
      it('creates a new one', async () => {
        let result = await this.adapter.findOrCreateContext(12);
        expect(result instanceof Context ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.userId).toEqual(12);
        let success = await result.store.redis.del('asd-context-12');
        expect(success).toEqual(1);
        expect(this.robot.brain.saveContext).toBeCalled();
      });
    });

    describe('context exists', () => {
      beforeEach(async () => {
        await this.robot.brain.userStore.redis.set('asd-context-12',
          JSON.stringify({someState: 'hello'}), 'EX', 100);
        jest.spyOn(this.robot.brain, 'getContext');
      });

      afterEach( async () => {
        this.robot.brain.getContext.mockRestore();
      });

      it('finds and returns expected hash', async () => {
        let result = await this.adapter.findOrCreateContext(12);
        expect(result instanceof Context ).toBe(true);
        expect(result.store).toBeTruthy();
        expect(result.userId).toEqual(12);
        expect(result._data).toEqual({someState: 'hello'});
        expect(this.robot.brain.getContext).toBeCalled();
        expect(this.robot.brain.saveContext).not.toBeCalled();
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
