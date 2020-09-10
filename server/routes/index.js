const authRouter = require('./auth');
const jobRouter = require('./jobs');
const mapRouter = require('./map');
const chatroomRouter = require('./chatroom');
const photoRouter = require('./photo');

module.exports = [
  authRouter,
  jobRouter,
  mapRouter,
  chatroomRouter,
  photoRouter,
];
