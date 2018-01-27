class Redis {
  static set(){

  }

  static put(){

  }


}

  connectToDb(redisCloudURL) {
    let redisClient = null;
    if (redisCloudURL) {
      const redisURL = url.parse(redisCloudURL);
      redisClient = redisModule.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
      redisClient.auth(redisURL.auth.split(":")[1]);
    } else {
      redisClient = redisModule.createClient();
    }
    db = redisClient;
    return redisClient;
  },


  save(key, value, expireTimeMS) {
    return new Promise((resolve, reject) => {
      this.cache.save(key, value, expireTimeMS, (error, newObject) => {
        if (error) {
          reject(error);
        } else {
          debug(`saved ${key} expiring ${expireTimeMS / 1000 / 60}`);
          resolve(newObject);
        }
      });
    });

  }

  load(key, options={}) {
