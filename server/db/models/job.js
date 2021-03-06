const {
  STRING,
  UUID,
  UUIDV4,
  FLOAT,
  ENUM,
  BOOLEAN,
  TEXT,
  DECIMAL,
} = require('sequelize');
const db = require('../db');

const Job = db.define(
  'job',
  {
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
      type: ENUM(
        'funded',
        'pending',
        'pendingVerification',
        'volunteer',
        'cancelled',
        'completed'
      ),
      allowNull: false,
    },
    price: {
      type: DECIMAL(20, 2),
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
    reservedUsername: {
      type: STRING,
    },
    lat: {
      type: FLOAT,
    },
    lng: {
      type: FLOAT,
    },
    description: {
      type: TEXT,
      allowNull: false,
    },
    summary: {
      type: STRING,
    },
    createdUser: {
      type: STRING,
    },
    funded: {
      type: FLOAT,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeCreate: job => {
        job.summary = `${job.description
          .split(' ')
          .filter((word, i) => i < 10)
          .join(' ')}...`;
      },
      afterUpdate: job => {
        job.summary = `${job.description
          .split(' ')
          .filter((word, i) => i < 10)
          .join(' ')}...`;
      },
    },
  }
);

module.exports = Job;
