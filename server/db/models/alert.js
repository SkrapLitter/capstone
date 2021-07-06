const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const Alert = db.define('alert', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  subject: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Alert;
