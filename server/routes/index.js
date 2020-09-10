const authRouter = require('./auth');
const jobRouter = require('./jobs');
const mapRouter = require('./map');
const chatroomRouter = require('./chatroom');
const alertRouter = require('./alert');

module.exports = [
  authRouter,
  jobRouter,
  mapRouter,
  chatroomRouter,
  alertRouter,
];
