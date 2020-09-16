const {
  models: { Session, User },
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

module.exports = { findUserBySession };
