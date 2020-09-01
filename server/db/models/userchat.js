const { UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const UserChat = db.define('userchat', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
});

module.exports = UserChat;
