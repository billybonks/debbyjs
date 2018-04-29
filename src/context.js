const File = require('./file');

class Context  extends File {

  update(data){
    if(data) {
      Object.assign(this._data, data);
    }
    return this.store.update(this.userId, this._data);
  }
}

module.exports = Context;
