const Session = require('./session');
const User = require('./user');
const Job = require('./job');
const ChatMessage = require('./chatmessage');
const Chatroom = require('./chatroom');
const UserChat = require('./userchat');
const Image = require('./image');
const Alert = require('./alert');

Job.belongsTo(User);
User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Job);
ChatMessage.belongsTo(Chatroom);
Chatroom.hasMany(ChatMessage);
User.hasMany(ChatMessage);
ChatMessage.belongsTo(User);
User.belongsToMany(Chatroom, { through: 'UserChat' });
Chatroom.belongsToMany(User, { through: 'UserChat' });
Chatroom.belongsTo(Job);
Job.hasMany(Chatroom);
Image.belongsTo(Job);
Job.hasMany(Image);
Alert.belongsTo(User);
User.hasMany(Alert);

module.exports = {
  models: {
    Job,
    User,
    Session,
    ChatMessage,
    Chatroom,
    UserChat,
    Image,
    Alert,
  },
};
