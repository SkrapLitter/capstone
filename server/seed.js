const { seed } = require('./db');
const startServer = require('./server.js');

seed(true).then(startServer);
