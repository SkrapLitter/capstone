const { STRING, UUID, UUIDV4, INTEGER, TEXT } = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');

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
  },
  {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  }
);
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
