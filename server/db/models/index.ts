import Session from './session';
import User from './user';
import Job from './job';

Job.belongsTo(User);
User.hasMany(Job);

const models = { Session, User, Job };

export default models;
