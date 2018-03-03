const BrainFile = require('./brain-file');

class User extends BrainFile {
  update(data){
    Object.assign(this._data, data);
    return this.brain.saveUserToCache(this._data);
  }
}

module.exports = User;
