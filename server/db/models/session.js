const { UUID, UUIDV4, BOOLEAN, STRING } = require('sequelize');
const db = require('../db');

const Session = db.define('session', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  socket: {
    type: STRING,
  },
  active: {
    type: BOOLEAN,
  },
});

module.exports = Session;
