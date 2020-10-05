require('dotenv').config();
const { STRING, UUID, UUIDV4, INTEGER, TEXT, FLOAT } = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');
const Session = require('./session');
const AWS = require('aws-sdk');

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
    balance: {
      type: FLOAT,
    },
  },
  {
    hooks: {
      beforeCreate: async user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      afterCreate: async user => {
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ID2,
          secretAccessKey: process.env.AWS_SECRET2,
        });

        s3.createBucket({ Bucket: user.id }, (err, data) => {
          if (err) {
            console.log('error', err);
          } else {
            console.log('success', data);
          }
        });
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
