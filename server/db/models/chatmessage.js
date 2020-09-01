const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const ChatMessage = db.define('chatMessage', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  author: {
    type: STRING,
    allowNull: false,
  },
  message: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = ChatMessage;
