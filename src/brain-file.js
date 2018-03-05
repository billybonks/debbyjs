class BrainFile {
  constructor(properties, brain){
    this.brain = brain;
    this.properties = properties || {};
  }

  get properties() {
    return this._data;
  }

  set properties(value){
    this.keys = [];
    this._data = value;
    for(let key in value){
      this.keys.push(key);
      Object.defineProperty(this, key,
        {
          get: function() {
            return this._data[key];
          },
          set: function(value){
            this._data[key] = value;
          }
        });
    }
  }
}

module.exports = BrainFile;
