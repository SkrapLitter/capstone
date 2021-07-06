const {
  models: { Session, User, Alert },
} = require('./db');

const findUserBySession = async sessionId => {
  const user = await User.findOne({
    include: [
      {
        model: Session,
        where: {
          id: sessionId,
        },
      },
    ],
  });
  return user;
};

const findUserIncludeSessions = async id => {
  const user = await User.findOne({
    include: [{ model: Session }],
    where: {
      id,
    },
  });
  return user;
};

const createAlert = async (userId, subject) => {
  const alert = await Alert.create({
    subject,
    userId,
  });
  return alert;
};
module.exports = { findUserBySession, findUserIncludeSessions, createAlert };
