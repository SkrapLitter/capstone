const jobRouter = require('express').Router();
const {
  models: { Job },
} = require('../db');

jobRouter.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).send({ jobs });
  } catch (e) {
    res.status(500).send(e);
    console.error('Error sending jobs', e);
  }
});

jobRouter.post('/', async (req, res) => {
  try {
    const { name, price, city, state, address, userId } = req.body;
    const status = price ? 'paid' : 'unpaid';
    await Job.create({
      name,
      price,
      city,
      state,
      address,
      status,
      userId,
    });
    res.status(200).send({ message: `${name} has been created` });
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
  } catch (e) {
    res.status(500).send(e);
    console.error('Error with job update', e);
  }
});

module.exports = jobRouter;
