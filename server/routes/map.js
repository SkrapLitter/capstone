require('dotenv').config();
const mapRouter = require('express').Router();

mapRouter.get('/getmap', (req, res) => {
  res.send(process.env.GOOGLE_MAP_KEY);
});

module.exports = {
  url: 'map',
  router: mapRouter,
};
