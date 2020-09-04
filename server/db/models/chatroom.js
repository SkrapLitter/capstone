const { STRING, UUID, UUIDV4, TEXT } = require('sequelize');
const db = require('../db');
const User = require('./user');

const Chatroom = db.define('chatroom', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  chatusers: {
    type: TEXT,
  },
  jobName: {
    type: STRING,
  },
});

Chatroom.prototype.findUsers = async function () {
  const users = await Chatroom.findAll({
    include: {
      model: User,
    },
    where: {
      id: this.id,
    },
  });
  return users;
};
module.exports = Chatroom;
