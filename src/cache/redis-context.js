const CacheRedis = require('./redis');
const Context = require('./../context');

class RedisContext extends CacheRedis  {
  constructor(name) {
    super(...arguments, Context);
    this.prefix = `${name}-context`;
  }
}

module.exports = RedisContext;
