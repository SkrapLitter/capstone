const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');
const { BOOLEAN } = require('sequelize/lib/data-types');

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
  global: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Alert;
