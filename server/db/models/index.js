const Session = require('./session');
const User = require('./user');
const Job = require('./job');

Job.belongsTo(User);
User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Job);

module.exports = {
  models: {
    Job,
    User,
    Session,
  },
};
