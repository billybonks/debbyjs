let Adapter = require('../../../src/bot/bot');
let HardDrive = require('../../../src/hard-drive');

describe('user management story', () => {
  beforeEach( () => {
    this.hardDrive = new HardDrive('asd', {});
    this.adapter = new Adapter({hardDrive: this.hardDrive});
    this.adapter.getRemoteUser = jest.fn().mockReturnValue({ id:12, name:'seb'});
  });

  describe('As a user', () => {

    describe('That doesn\'t exist', () => {
      beforeEach( ()=> {
        this.hardDrive.userStore.create = jest.fn();
        this.hardDrive.getCachedUser = jest.fn().mockReturnValue(null);
      });

      it('fetches remote user', async () => {
        await this.adapter.findOrCreateUser(12);
        expect(this.adapter.getRemoteUser).toBeCalled();
        expect(this.adapter.getRemoteUser).toBeCalledWith(12);
      });
      test('tries to fetch local user', async () => {
        this.hardDrive.getLocalUser = jest.fn().mockReturnValue(null);
        await this.adapter.findOrCreateUser(12);
        expect(this.hardDrive.getLocalUser).toBeCalled();
        expect(this.hardDrive.getLocalUser).toBeCalledWith(12);
      });

      test('calls saveUser on harddrive with remote user data', async () => {
        this.hardDrive.saveLocalUser = jest.fn().mockReturnValue(null);
        await this.adapter.findOrCreateUser(12);
        expect(this.hardDrive.saveLocalUser).toBeCalledWith(12, { id:12, name:'seb'});
        expect(this.hardDrive.userStore.create).toBeCalledWith(12, { id:12, name:'seb'});
      });
    });

    describe('That exists', () => {
      let user = { id:12, name:'seb'};
      let jsonUser = JSON.stringify(user);
      describe('in the cache', () => {
        beforeEach( () => {
          this.hardDrive.userStore.redis.get = jest.fn().mockReturnValue(jsonUser);
          this.adapter.getRemoteUser = jest.fn();
        });

        test('it returns users', async () => {
          let result = await this.adapter.findOrCreateUser(12);
          expect(this.hardDrive.userStore.redis.get).toHaveBeenCalledWith('asd-12');
          expect(this.adapter.getRemoteUser).not.toHaveBeenCalled();
          expect(result._data).toMatchSnapshot();
          expect(result.constructor.name).toMatchSnapshot();
        });

        test('uses correct id when updating user', async () => {
          let result = await this.adapter.findOrCreateUser(12);
          this.hardDrive.userStore.redis.set = jest.fn();
          result.properties = {
            id: 115,
            name: 'debby'
          };
          result.update();
          expect(this.hardDrive.userStore.redis.set).toBeCalledWith('asd-12', '{"id":115,"name":"debby"}','EX', 600);

        });
      });
      describe('on the main database', () => {
        beforeEach( () => {
          this.hardDrive.userStore.redis.get = jest.fn();
          this.hardDrive.userStore.redis.set = jest.fn();
          this.adapter.getRemoteUser = jest.fn();
          this.hardDrive.getLocalUser = jest.fn().mockReturnValue(user);
        });

        test('it checks the database', async() => {
          let result = await this.adapter.findOrCreateUser(12);
          expect(this.hardDrive.userStore.redis.get).toHaveBeenCalledWith('asd-12');
          expect(this.hardDrive.userStore.redis.set).toHaveBeenCalledWith('asd-12', jsonUser, 'EX', 600);
          expect(this.hardDrive.getLocalUser).toHaveBeenCalledWith(12);
          expect(this.adapter.getRemoteUser).not.toHaveBeenCalled();
          expect(result._data).toMatchSnapshot();
          expect(result.constructor.name).toMatchSnapshot();
        });
      });
    });
  });
});
