class BrainFile {
  constructor(properties, brain){
    this.brain = brain;
    this.properties = properties || {};
  }

  set(key, value) {
    this.properties[key] = value;
    this.proxyKey(key);
  }

  get properties() {
    return this._data;
  }

  set properties(value = {}){
    this.keys = [];
    this._data = value;
    this.__data = value;
    for(let key in value) {
      this.proxyKey(key);
    }
  }

  proxyKey(key){
    if(!this.hasOwnProperty(key)) {
      this.keys.push(key);
      Object.defineProperty(this, key,
        {
          get: function() {
            return this.__data[key] || this._data;
          },
          set: function(value){
            this._data[key] = value;
          }
        });
    }
  }
}

module.exports = BrainFile;
