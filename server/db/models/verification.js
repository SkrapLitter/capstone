const { STRING, UUID, UUIDV4 } = require('sequelize');

const db = require('../db');

const Verification = db.define('verification', {
  url: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = Verification;
