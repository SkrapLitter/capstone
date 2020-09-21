const { UUID, UUIDV4, STRING, ENUM, DECIMAL } = require('sequelize');
const db = require('../db');

const Payment = db.define('payment', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DECIMAL(20, 2),
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
