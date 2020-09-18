const Session = require('./session');
const User = require('./user');
const Job = require('./job');
const ChatMessage = require('./chatmessage');
const Chatroom = require('./chatroom');
const Image = require('./image');
const Alert = require('./alert');
const Payment = require('./payment');

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
Payment.belongsTo(Job);
Payment.belongsTo(User);
User.hasMany(Payment);
Job.hasMany(Payment);

module.exports = {
  models: {
    Job,
    User,
    Session,
    ChatMessage,
    Chatroom,
    Image,
    Alert,
    Payment,
  },
};
