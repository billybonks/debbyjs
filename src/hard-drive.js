const RedisUser = require('./cache/redis-user');
const RedisContext = require('./cache/redis-context');
class HardDrive {

  constructor(name, redis){
    this.name = name;
    this.userStore = new RedisUser(name, redis, 600);
    this.contextStore = new RedisContext(name, redis, 600);
  }

  getCachedUser(id){
    return this.userStore.fetch(id);
  }

  async getUser(id, data){
    let user = await this.getCachedUser(id);
    if(!user) {
      user = await this.getLocalUser(id, data);
      if(user) {
        return this.cacheUser(id, user);
      } else {
        return null;
      }
    }
    return user;
  }

  getLocalUser() {
    return null;
  }

  cacheUser(id, user){
    return this.userStore.create(id, user);
  }

  async saveUser(userId, user){
    user = await this.saveLocalUser(userId, user) || user;
    this.cacheUser(userId, user);
  }

  saveLocalUser(/*userId, _user*/){
    return null;
  }

  getContext(id){
    return this.contextStore.fetch(id);
  }

  saveContext(id, context){
    return this.contextStore.create(id, context);
  }
}

module.exports = HardDrive;
