const authRouter = require('./auth');
const jobRouter = require('./jobs');
const mapRouter = require('./map');

module.exports = [authRouter, jobRouter, mapRouter];
