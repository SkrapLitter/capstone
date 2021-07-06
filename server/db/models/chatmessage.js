const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const ChatMessage = db.define('chatMessage', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  message: {
    type: STRING,
    allowNull: false,
  },
  author: {
    type: STRING,
    allowNull: false,
  },
  recipient: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = ChatMessage;
