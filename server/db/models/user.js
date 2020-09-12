require('dotenv').config();
const { STRING, UUID, UUIDV4, INTEGER, TEXT } = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');
const Session = require('./session');
const stripe = require('stripe')(process.env.STRIPE_SKEY);

const User = db.define(
  'user',
  {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    clearance: {
      type: INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5,
      },
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    image: {
      type: TEXT,
      defaultValue:
        'https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=1618390',
    },
    oauth: {
      type: STRING,
    },
    stripe: {
      type: STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        try {
          if (!user.stripe) {
            const account = await stripe.accounts.create({
              type: 'express',
              country: 'US',
              email: `${user.username}`,
              capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
              },
            });
            user.stripe = account.id;
          }
        } catch (e) {
          console.error('error with stripe', e);
        }
      },
    },
  }
);
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
User.prototype.findUserBySession = function (sessionId) {
  return User.findOne({
    include: [
      {
        model: Session,
        where: {
          id: sessionId,
        },
      },
    ],
  });
};

module.exports = User;
