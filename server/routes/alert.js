const alertRouter = require('express').Router();
const {
  models: { Alert },
} = require('../db');

alertRouter.get('/user/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      const alert = await Alert.findAll({
        where: {
          userId: id,
          seen: false,
        },
        order: [['updatedAt', 'DESC']],
      });
      res.status(200).send(alert);
    }
  } catch (e) {
    console.error('error with /alert/user get', e);
    res.sendStatus(500);
  }
});
alertRouter.get('/all/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      const alert = await Alert.findAll({
        where: {
          userId: id,
        },
        limit: 10,
        order: [['createdAt', 'DESC']],
      });
      res.status(200).send(alert);
    }
  } catch (e) {
    console.error('error with /alert/user get', e);
    res.sendStatus(500);
  }
});
alertRouter.post('/', async (req, res) => {
  try {
    const { userId, subject } = req.body;
    const alert = await Alert.create({
      userId,
      subject,
    });
    res.status(200).send(alert);
  } catch (e) {
    console.error('error with post /alert get', e);
    res.sendStatus(500);
  }
});
alertRouter.put('/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      await Alert.update(
        {
          seen: true,
        },
        {
          where: {
            id,
          },
        }
      );
      res.sendStatus(200);
    }
  } catch (e) {
    console.error('error with /alert put', e);
    res.sendStatus(500);
  }
});
alertRouter.delete('/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      await Alert.destroy({
        where: {
          id,
        },
      });
      res.sendStatus(200);
    }
  } catch (e) {
    console.error('error with /alert delete', e);
    res.sendStatus(500);
  }
});

module.exports = {
  url: 'alert',
  router: alertRouter,
};
