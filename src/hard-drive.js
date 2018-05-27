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

  saveUser(userId, user){
    return this.userStore.create(userId, user);
  }

  getContext(id){
    return this.contextStore.fetch(id);
  }

  saveContext(id, context){
    return this.contextStore.create(id, context);
  }
}

module.exports = HardDrive;
