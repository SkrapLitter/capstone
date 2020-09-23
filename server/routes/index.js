const authRouter = require('./auth');
const jobRouter = require('./jobs');
const mapRouter = require('./map');
const chatroomRouter = require('./chatroom');
const photoRouter = require('./photo');
const alertRouter = require('./alert');
const userRouter = require('./user');
const paymentRouter = require('./payment');

module.exports = [
  authRouter,
  jobRouter,
  mapRouter,
  chatroomRouter,
  photoRouter,
  alertRouter,
  userRouter,
  paymentRouter,
];
