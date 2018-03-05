const RedisUser = require('./cache/redis-user');
const RedisContext = require('./cache/redis-context');
class Brain {

  constructor(name, redis){
    this.name = name;
    this.userStore = new RedisUser(name, redis, 600);
    this.contextStore = new RedisContext(name, redis, 600);
  }

  getUser(id){
    this.userStore.fetch(id);
  }

  saveUser(userId, user){
    this.userStore.save(userId, user);
  }

  getContext(id){
    this.contextStore.fetch(id);
  }

  saveContext(id, context){
    this.contextStore.save(id, context);
  }
}

module.exports = Brain;
