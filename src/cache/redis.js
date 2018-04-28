const Redis = require('ioredis');

class CacheRedis {

  constructor(name, redis, expiry, klass){
    this.name = name;
    this.redis = new Redis(redis);
    this.klass = klass;
    this.expiry = expiry;
  }

  generateRedisKey(id){
    return `${this.prefix}-${id}`;
  }

  async fetch(id){
    let serializedData = await this.redis.get(this.generateRedisKey(id));
    if(serializedData){
      let data = JSON.parse(serializedData);
      return this.constructKlass(id, data);
    }
  }

  async update(id, object){
    return this.redis.set(this.generateRedisKey(id), JSON.stringify(object), 'EX', this.expiry);
  }

  async create(id, object) {
    await this.update(id, object);
    return this.constructKlass(id, object);
  }

  constructKlass(id, data){
    let result =  new this.klass(data);
    result.store = this;
    return result;
  }
}

module.exports = CacheRedis;
