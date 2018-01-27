let users = {}

class Brain {
  findUser(id){
    return users[id];
  }

  createUser(userId, user){
    return users[userId] = user
  }
}

module.exports = Brain;
