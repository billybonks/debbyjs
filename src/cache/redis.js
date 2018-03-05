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
      return new this.klass(data, this);
    }
  }

  async save(id, object){
    return this.redis.set(this.generateRedisKey(id), JSON.stringify(object), 'EX', this.expiry);
  }
}

module.exports = CacheRedis;
