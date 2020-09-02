const Session = require('./session');
const User = require('./user');
const Job = require('./job');
const ChatMessage = require('./chatmessage');
const ChatRoom = require('./chatroom');
const UserChat = require('./userchat');

Job.belongsTo(User);
User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Job);
ChatMessage.belongsTo(ChatRoom);
ChatRoom.hasMany(ChatMessage);
User.hasMany(ChatMessage);
ChatMessage.belongsTo(User);
User.belongsToMany(ChatRoom, { through: UserChat });
ChatRoom.belongsToMany(User, { through: UserChat });

module.exports = {
  models: {
    Job,
    User,
    Session,
    ChatMessage,
    ChatRoom,
  },
};
