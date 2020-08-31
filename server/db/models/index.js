const Session = require('./session');
const User = require('./user');
const Job = require('./job');
const ChatMessage = require('./chatmessage');
const ChatRoom = require('./chatroom');

Job.belongsTo(User);
User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Job);
ChatMessage.belongsTo(ChatRoom);
ChatRoom.hasMany(ChatMessage);

module.exports = {
  models: {
    Job,
    User,
    Session,
    ChatMessage,
    ChatRoom,
  },
};
