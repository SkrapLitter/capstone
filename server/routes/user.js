const userRouter = require('express').Router();
const {
  models: { User, Session },
} = require('../db');
const stripe = require('stripe')(process.env.STRIPE_SKEY);
const dotenv = require('dotenv');

dotenv.config();

userRouter.get('/stripe/dashboard/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const link = await stripe.accounts.createLoginLink(user.stripe);
      res.status(200).send(link.url);
    }
  } catch (e) {
    console.error('stripe error', e);
  }
});
userRouter.get('/stripe/account/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const account = await stripe.account.retrieve(user.stripe);
    res.status(200).send(account);
  } catch (e) {
    console.error('stripe error', e);
  }
});
userRouter.post('/stripe/onboarding/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      // const accountLink = `${process.env.STRIPE_URI}?response_type=code&scope=read_write&redirect_uri=http://localhost:3000/api/user/stripe/callback&client_id=${process.env.STRIPE_CLIENT}&stripe_user[business_type]=individual&stripe_user[email]=${user.username}&stripe_user[first_name]=${user.firstName}&stripe_user[last_name]=${user.lastName}&stripe_user[phone_number]=0000000000`;
      const accountLink = `${process.env.STRIPE_URI}?response_type=code&scope=read_write&redirect_uri=http://skraplitter.herokuapp.com/api/user/stripe/callback&client_id=${process.env.STRIPE_CLIENT}&stripe_user[business_type]=individual&stripe_user[email]=${user.username}&stripe_user[first_name]=${user.firstName}&stripe_user[last_name]=${user.lastName}&stripe_user[phone_number]=0000000000`;
      res.status(200).send(accountLink);
    } else res.status(500).send({ error: 'user not found' });
  } catch (e) {
    res.sendStatus(500);
    console.error('stripe onboarding error', e);
  }
});
userRouter.get(`/stripe/callback/`, async (req, res) => {
  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code: req.query.code,
    });
    const user = await User.findByPk(req.user.id);
    const balance = await stripe.balance.retrieve({
      stripeAccount: response.stripe_user_id,
    });
    user.update({
      stripe: response.stripe_user_id,
      balance: balance.available[0].amount,
    });
    res.redirect('/');
  } catch (e) {
    res.sendStatus(500);
    console.error('stripe callback error', e);
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
