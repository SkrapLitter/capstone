const userRouter = require('express').Router();
const {
  models: { User, Session },
} = require('../db');
const stripe = require('stripe')(process.env.STRIPE_SKEY);

userRouter.post('/stripe/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.param;
      const user = await User.findByPk(id);
      const link = await stripe.accounts.createLoginLink(user.stripe);
      user.stripeDashboard = link;
      res.status(200).send(user);
    }
  } catch (e) {
    console.error('stripe error', e);
  }
});
userRouter.put('/socketConnect/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Session.update(
      {
        socket: id,
        active: true,
      },
      {
        where: {
          id: req.cookies.session_id,
        },
      }
    );

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});
userRouter.put('/socketDisconnect/:id', async (req, res) => {
  try {
    console.log('disconnecting');
    await Session.update(
      {
        active: false,
      },
      {
        where: {
          id: req.cookies.session_id,
        },
      }
    );
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

module.exports = {
  url: 'user',
  router: userRouter,
};
