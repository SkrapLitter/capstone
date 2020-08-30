const {
  models: { Session, User },
} = require('./db');

const findUserBySession = sessionId =>
  User.findOne({
    include: [
      {
        model: Session,
        where: {
          id: sessionId,
        },
      },
    ],
  });

module.exports = { findUserBySession };
