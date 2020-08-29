import { STRING, UUID, UUIDV4, INTEGER } from 'sequelize';
import db from '../db';

const User = db.define('user', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  salt: {
    type: STRING,
    allowNull: false,
  },
  clearance: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5,
    },
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  image: {
    type: STRING,
    defaultValue: 'https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=1618390',
  },
});

export default User;
