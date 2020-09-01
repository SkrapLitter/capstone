const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const ChatRoom = db.define('chatroom', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = ChatRoom;
