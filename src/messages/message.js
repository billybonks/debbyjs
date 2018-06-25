class Message {
  // Represents an incoming message from the chat.
  //
  // user - A User instance that sent the message.
  constructor (user, room) {
    this.user = user;
    this.room = room;
  }
}

module.exports = Message;
