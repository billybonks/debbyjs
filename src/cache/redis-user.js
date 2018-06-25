const CacheRedis = require('./redis');
const User = require('./../user');

class RedisUser extends CacheRedis  {
  constructor(name) {
    super(...arguments, User);
    this.prefix = name;
  }
}

module.exports = RedisUser;
