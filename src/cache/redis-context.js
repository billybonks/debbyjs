const CacheRedis = require('./redis');
const Context = require('./../context');

class RedisContext extends CacheRedis  {
  constructor(name) {
    super(...arguments, Context);
    this.prefix = `${name}-context`;
  }

  constructKlass(id, data){
    let result = super.constructKlass(id, data);
    result.userId = id;
    return result;
  }
}

module.exports = RedisContext;
