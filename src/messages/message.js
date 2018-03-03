class Message {
  // Represents an incoming message from the chat.
  //
  // user - A User instance that sent the message.
  constructor (user, room) {
    this.user = user;
    this.room = room;
  }

  buildResponse(text) {
    return {
      user:this.user,
      room:this.room,
      text: text.response,
    };
    //not a constructor apparently
    //return new MessageText(this.user, this.room, text.response);
  }
}

module.exports = Message;
