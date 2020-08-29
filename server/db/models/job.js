const { STRING, UUID, UUIDV4, FLOAT, ENUM, BOOLEAN } = require('sequelize');
const db = require('../db');

const Job = db.define('job', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: ENUM('paid', 'unpaid', 'cancelled', 'completed'),
    allowNull: false,
  },
  price: {
    type: FLOAT,
    defaultValue: 0,
  },
  city: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  reserved: {
    type: BOOLEAN,
    defaultValue: false,
  },
  reservedUser: {
    type: STRING,
    userId: UUID,
  },
});

module.exports = Job;
