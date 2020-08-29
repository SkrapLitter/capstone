import { STRING, UUID, UUIDV4, FLOAT, ENUM, BOOLEAN } from 'sequelize';
import db from '../db';

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
    type: ENUM('active', 'pending', 'closed', 'completed'),
    allowNull: false,
  },
  price: {
    type: FLOAT,
    defaultValue: 0,
    validate: {
      isActive: () => {
        if (this.status === 'active' && !this.price) {
          throw new Error('Price cannot be 0 for an active order');
        }
      },
    },
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
  },
});

export default Job;
