const { UUID, UUIDV4, FLOAT, STRING, ENUM } = require('sequelize');
const db = require('../db');

const Payment = db.define('payment', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: FLOAT,
    allowNull: false,
  },
  subject: {
    type: STRING,
  },
  type: {
    type: ENUM('payment', 'deposit', 'refund'),
    allowNull: false,
  },
});

module.exports = Payment;
