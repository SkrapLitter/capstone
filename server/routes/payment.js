require('dotenv').config();
const paymentRouter = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SKEY);
const {
  models: { Job, Payment },
} = require('../db');

paymentRouter.post('/stripe/checkout', async (req, res) => {
  try {
    const { user, job, token, total, price } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await Payment.create({
      amount: total,
      userId: user.id,
      jobId: job.id,
      type: 'deposit',
      subject: `funding job ${job.name}, id: ${job.id}`,
    });
    const idempotencyKey = payment.id;
    await stripe.charges.create(
      {
        amount: total * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Funded Job ${job.name}, id:${job.id}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
    await Job.update(
      {
        status: 'funded',
        price,
      },
      {
        where: {
          id: job.id,
        },
      }
    );
    const status = 'success';
    res.status(202).send({ status });
  } catch (e) {
    const status = 'failure';
    res.status(202).send({ status });
  }
});

module.exports = {
  url: 'payment',
  router: paymentRouter,
};
