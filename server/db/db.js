const Sequelize = require('sequelize');

const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://localhost:5432/capstone2020';

let config;
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    operatorsAliases: false,
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
} else {
  config = {
    logging: false,
    operatorsAliases: false,
  };
}

const db = new Sequelize(DATABASE_URL, config);

module.exports = db;
