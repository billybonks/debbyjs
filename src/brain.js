const Redis = require('ioredis');
const User = require('./user');
const Context = require('./context');
/*
  conversation and user data
*/
class Brain {

  constructor(name, redis){
    this.name = name;
    this.redis = new Redis(redis);
  }

  generateRedisKey(userId){
    return `${this.name}-${userId}`;
  }

  generateRedisContextKey(user){
    return this.generateRedisKey(`context-${user.id}`);
  }

  async getUserFromCache(userId){
    let serializedUser = await this.redis.get(this.generateRedisKey(userId));
    if(serializedUser){
      let data = JSON.parse(serializedUser);
      return new User(data, this);
    }
  }

  async getContext(user){
    let data = {}
    let serializedUserContext = await this.redis.get(this.generateRedisContextKey(user));
    if(serializedUserContext){
      data = JSON.parse(serializedUserContext);
    }
    return new Context(data, this);
  }

  async saveUserToCache(userId, user){
    return this.redis.set(this.generateRedisKey(userId), JSON.stringify(user), 'EX', 600);
  }

  updateContext(user, context){
    return this.redis.set(this.generateRedisContextKey(user), JSON.stringify(context), 'EX', 600);
  }

  findUser(userId){
    this.getUserFromCache(userId);
  }

  createUser(userId, user){
    this.saveUserToCache(user);
  }
}

module.exports = Brain;
