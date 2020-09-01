const { models } = require('./models');
const db = require('./db');

const { User, Job } = models;

const sync = async () => {
  try {
    const user = await User.create({
      username: 'admin@fullstack.com',
      password: 'password',
      firstName: 'Default',
      lastName: 'Admin',
      image:
        'https://thumbs.dreamstime.com/b/red-admin-sign-pc-laptop-vector-illustration-administrator-icon-screen-controller-man-system-box-88756468.jpg',
      clearance: 5,
    });
    console.log(user.validPassword('password'));
    await Job.create({
      name: 'McCarren Park',
      status: 'paid',
      price: 20,
      city: 'Brooklyn',
      state: 'New York',
      address: 'Bedford Ave and Lorimer St',
      userId: user.id,
    });
  } catch (e) {
    console.error(e);
  }
};
const seed = async (force = true) => {
  try {
    await db.sync({ force });
    if (force) {
      await sync();
    }
    console.log('seed was successful');
  } catch (e) {
    throw new Error('seed unsuccessful', e);
  }
};

module.exports = {
  seed,
  models,
};
