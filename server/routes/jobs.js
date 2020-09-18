require('dotenv').config();
const jobRouter = require('express').Router();
const {
  models: { Job, Image },
} = require('../db');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const axios = require('axios');

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;
  return {
    limit,
    offset,
  };
};

jobRouter.get('/', async (req, res) => {
  try {
    const { filter, page, size, type } = req.query;
    let jobs;
    const { limit, offset } = getPagination(page, size);
    if (!filter && !type) {
      jobs = await Job.findAndCountAll({
        limit,
        offset,
        order: [['updatedAt', 'DESC']],
        where: {
          [Op.or]: [
            {
              status: 'funded',
            },
            {
              status: 'volunteer',
            },
          ],
        },
        include: [
          {
            model: Image,
          },
        ],
      });
    } else if (!filter && type) {
      jobs = await Job.findAndCountAll({
        limit,
        offset,
        where: {
          status: `${type}`,
        },
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Image,
          },
        ],
      });
    } else if (!type) {
      jobs = await Job.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${filter}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${filter}%`,
              },
            },
            {
              city: {
                [Op.iLike]: `%${filter}%`,
              },
            },
            {
              state: {
                [Op.iLike]: `%${filter}%`,
              },
            },
          ],
        },
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Image,
          },
        ],
      });
    } else if (type) {
      jobs = await Job.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  name: {
                    [Op.iLike]: `%${filter}%`,
                  },
                },
                {
                  description: {
                    [Op.iLike]: `%${filter}%`,
                  },
                },
                {
                  city: {
                    [Op.iLike]: `%${filter}%`,
                  },
                },
                {
                  state: {
                    [Op.iLike]: `%${filter}%`,
                  },
                },
              ],
            },
            {
              status: `${type}`,
            },
          ],
        },
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Image,
          },
        ],
      });
    }
    res.status(200).send(jobs);
  } catch (e) {
    res.status(500).send({ message: 'error' });
    console.error('Error sending jobs', e);
  }
});

jobRouter.get('/map', async (req, res) => {
  try {
    const { north, south, east, west } = req.query;
    const jobs = await Job.findAll({
      where: {
        lat: {
          [Op.and]: [{ [Op.lte]: +north }, { [Op.gte]: +south }],
        },
        lng: {
          [Op.and]: [{ [Op.lte]: +east }, { [Op.gte]: +west }],
        },
      },
      include: [
        {
          model: Image,
        },
      ],
    });
    res.status(200).send(jobs);
  } catch (e) {
    res.status(500).send({ message: 'error' });
    console.log('Error sending jobs', e);
  }
});

jobRouter.get('/job/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({
      where: {
        id,
      },
      include: [Image],
    });
    res.status(200).send(job);
  } catch (e) {
    res.sendStatus(500);
    console.error('error finding job', e);
  }
});

jobRouter.post('/', async (req, res) => {
  try {
    const {
      name,
      price,
      address,
      userId,
      description,
      images,
      status,
    } = req.body;
    const ids = images.map(image => image.id);
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
    await Image.update({ jobId: job.id }, { where: { id: ids } });
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
    const job = await Job.findOne({
      where: { id },
      include: [Image],
    });
    if (!req.isAuthenticated || !req.user) {
      res.status(500).send({
        status: false,
        message: 'You must be logged in to complete this action',
      });
    } else {
      switch (type) {
        case 'reserve': {
          if (req.isAuthenticated() && req.user) {
            if (!job.reserved) {
              await job.update({
                reserved: true,
                reservedUser: req.user.id,
                reservedUsername: req.user.username,
              });
            } else {
              res.status(500).send({
                status: false,
                shouldUpdateStore: true,
                message: 'This job is already reserved',
                job,
              });
            }
          }
          break;
        }
        case 'unreserve': {
          if (req.isAuthenticated() && req.user) {
            if (job.reserved) {
              await job.update({
                reserved: false,
                reservedUser: null,
                reservedUsername: null,
              });
            } else {
              res.status(500).send({
                status: false,
                shouldUpdateStore: true,
                message: 'This job not reserved',
                job,
              });
            }
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
      res.status(202).send({ status: true, job });
    }
  } catch (e) {
    res.status(500).send({ status: false });
    console.error('Error with job update', e);
  }
});

module.exports = {
  url: 'jobs',
  router: jobRouter,
};
