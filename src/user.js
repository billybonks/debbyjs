const File = require('./file');

class User extends File {
  update(data){
    if(data) {
      Object.assign(this._data, data);
    }
    return this.store.update(this.redisKey, this._data);
  }
}

module.exports = User;
