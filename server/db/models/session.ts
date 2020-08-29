import { UUID, UUIDV4 } from 'sequelize';
import db from '../db';

const Session = db.define('session', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
});

export default Session;
