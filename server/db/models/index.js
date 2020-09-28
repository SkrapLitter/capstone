const Session = require('./session');
const User = require('./user');
const Job = require('./job');
const ChatMessage = require('./chatmessage');
const Chatroom = require('./chatroom');
const Image = require('./image');
const Alert = require('./alert');
const Payment = require('./payment');
const Verification = require('./verification');

Job.belongsTo(User);
User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Job);

Chatroom.belongsTo(User, {
  as: 'poster',
});

Chatroom.belongsTo(User, {
  as: 'worker',
});

User.hasMany(Chatroom, {
  as: 'poster',
});

User.hasMany(Chatroom, {
  as: 'worker',
});

Chatroom.belongsTo(Job);
Job.hasOne(Chatroom);

ChatMessage.belongsTo(Chatroom);
Chatroom.hasMany(ChatMessage);

Image.belongsTo(Job);
Job.hasMany(Image);
Verification.belongsTo(Job);
Job.hasMany(Verification);
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
    Verification,
  },
};
