const BrainFile = require('./brain-file');

class Context  extends BrainFile{

  update(user, data){
    Object.assign(this._data, data);
    return this.brain.updateContext(user, this._data);
  }
}

module.exports = Context;
