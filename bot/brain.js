let users = {}
var Redis = require('ioredis');

/*
  conversation and user data
*/
class Brain {

  constructor(name, redis){
    this.name = name;
    this.redis = new Redis(redis);
  }

  async findUser(userId){
    debugger
    let serializedUser = await this.redis.get(`${this.name}-${userId}`);
    if(serializedUser){
      return JSON.parse(serializedUser)
    }
  }

  createUser(userId, user){
    debugger
    return this.redis.set(`${this.name}-${userId}`, JSON.stringify(user), 'EX', 100);
  }
}

module.exports = Brain;
