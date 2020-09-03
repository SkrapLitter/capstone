require('dotenv').config();
const jobRouter = require('express').Router();
const {
  models: { Job },
} = require('../db');

const axios = require('axios');

jobRouter.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).send(jobs);
  } catch (e) {
    res.status(500).send(e);
  }
});

jobRouter.post('/', async (req, res) => {
  try {
    const { name, price, address, userId, description } = req.body;
    const status = price ? 'paid' : 'unpaid';
    const city = address.value.structured_formatting.secondary_text.split(
      ', '
    )[0];
    const state = address.value.structured_formatting.secondary_text.split(
      ', '
    )[1];
    const geocodeData = await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${encodeURI(
          `${address.value.place_id}`
        )}&key=${process.env.GEOCODE_KEY}`
      )
      .then(response => response.data);

    const lat = geocodeData.results[0].geometry.location.lat;
    const lng = geocodeData.results[0].geometry.location.lng;
    const job = await Job.create({
      name,
      price,
      status,
      userId,
      description,
      lat,
      lng,
      address: address.value.structured_formatting.main_text,
      city,
      state,
    });
    res.status(200).send({ jobId: job.id });
  } catch (e) {
    res.status(500).send(e);
    console.error('Error posting job', e);
  }
});

jobRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const job = await Job.findByPk(id);
    switch (type) {
      case 'reserve': {
        if (req.isAuthenticated() && req.user) {
          await Job.update(
            {
              reserved: true,
              reservedUser: req.user.id,
            },
            {
              where: { id },
            }
          );
        }
        break;
      }
      case 'update': {
        if (
          (req.isAuthenticated() && req.user && job.userId === req.user.id) ||
          (req.user && req.user.clearance === 5)
        ) {
          const { name, price, city, state, address, userId } = req.body;
          const status = price ? 'paid' : 'unpaid';
          await Job.update(
            {
              name,
              price,
              city,
              state,
              address,
              userId,
              status,
            },
            {
              where: { id },
            }
          );
        }
        break;
      }
      case 'complete': {
        if (
          (req.isAuthenticated() && req.user && job.userId === req.user.id) ||
          (req.user && req.user.clearance === 5)
        ) {
          await Job.update(
            {
              status: 'completed',
            },
            {
              where: { id },
            }
          );
        }
        break;
      }
      case 'cancel': {
        if (
          (req.isAuthenticated() && req.user && job.userId === req.user.id) ||
          (req.user && req.user.clearance === 5)
        ) {
          await Job.update(
            {
              status: 'cancelled',
            },
            {
              where: { id },
            }
          );
        }
        break;
      }
      default:
        break;
    }
    res.status(202).send({ status: true });
  } catch (e) {
    res.status(500).send({ status: false });
    console.error('Error with job update', e);
  }
});

module.exports = {
  url: 'jobs',
  router: jobRouter,
};
