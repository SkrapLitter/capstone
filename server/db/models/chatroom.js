const { UUID, UUIDV4 } = require('sequelize');
const { INTEGER } = require('sequelize/lib/data-types');
const db = require('../db');
const User = require('./user');

const Chatroom = db.define('chatroom', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  workerMessage: {
    type: INTEGER,
    defaultValue: 0,
  },
  posterMessage: {
    type: INTEGER,
    defaultValue: 0,
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
