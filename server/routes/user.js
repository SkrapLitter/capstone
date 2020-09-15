const userRouter = require('express').Router();
const {
  models: { User, Session },
} = require('../db');
const stripe = require('stripe')(process.env.STRIPE_SKEY);

userRouter.post('/stripe/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const link = await stripe.accounts.createLoginLink(user.stripe);
      user.update({
        stripeDashBoard: link,
        onboarding: true,
      });
      res.status(200).send(user);
    }
  } catch (e) {
    console.error('stripe error', e);
  }
});
userRouter.get('/stripe/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const account = await stripe.accounts.retrieve(user.stripe);
      res.status(200).send(account.charges_enabled);
    }
  } catch (e) {
    console.error('stripe error', e);
  }
});
userRouter.delete('/stripe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await stripe.accounts.del(id);
    res.status(200).send(deleted);
  } catch (e) {
    res.sendStatus(500);
    console.error('stripe delete', e);
  }
});
userRouter.put('/socketConnect/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByPk(req.cookies.session_id);
    session.update({
      socket: id,
    });
    await User.update(
      {
        socket: id,
      },
      {
        where: {
          id: session.userId,
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
