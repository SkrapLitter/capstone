/* eslint-disable import/prefer-default-export */
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/capstone2020', {
  logging: false,
});

export default db;
