module.exports = ['age','bored','bye','favorite','how-are-you','joke','laughing','my-name',
  'robot','taxi','thanks','tired','working','your-name','greet'].reduce(function(acc, item){
  //acc[item] = require(`./${item}`);
  acc.push(require(`./${item}`));
  return acc;
}, []);
