require('dotenv').config();
const paymentRouter = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SKEY);
const {
  models: { Job, Payment, User, Alert },
} = require('../db');

paymentRouter.post('/stripe/checkout', async (req, res) => {
  try {
    const { user, job, token, total, price, applicationFee } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    let payment;
    if (user.id) {
      payment = await Payment.create({
        amount: total,
        userId: user.id,
        jobId: job.id,
        type: 'deposit',
        subject: `Initial Deposit for funding job ${job.name}`,
      });
    } else if (!user.id) {
      payment = await Payment.create({
        amount: total,
        jobId: job.id,
        type: 'deposit',
        subject: `Initial Deposit for funding job ${job.name}`,
      });
    }
    const idempotencyKey = payment.id;
    const charge = await stripe.charges.create(
      {
        amount: (total + applicationFee) * 100,
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
    await payment.update({
      chargeId: charge.id,
    });
    await Job.update(
      {
        status: 'funded',
        price,
        funded: price,
      },
      {
        where: {
          id: job.id,
        },
      }
    );
    const status = 'success';
    res.status(202).send(status);
  } catch (e) {
    const status = 'failure';
    res.status(202).send(status);
  }
});

paymentRouter.put('/stripe/cancel/:id', async (req, res) => {
  let status = false;
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);
    if (job) {
      if (job.status === 'volunteer' || job.status === 'pending') {
        await Job.update(
          {
            status: 'cancelled',
          },
          {
            where: {
              id,
            },
          }
        );
        status = true;
      } else if (job.funded > 0 && job.status === 'funded' && !job.reserved) {
        const payments = await Payment.findAll({
          where: {
            jobId: id,
            type: 'deposit',
          },
          include: [
            {
              model: User,
            },
          ],
        });
        await payments.forEach(async payment => {
          await stripe.refunds.create({
            charge: 'ch_1HSYwXE7ag3tHwto1gL7LvsA',
            amount: payment.amount * 100,
          });
          if (payment.userId) {
            await Payment.create({
              type: 'refund',
              subject: `${job.name} has been cancelled and a refund has been issued`,
              amount: payment.amount,
              userId: payment.userId,
              jobId: payment.jobId,
            });
          }
        });
        await Alert.create({
          subject: `${job.name} has been cancelled and a refund has been issued`,
          userId: job.userId,
        });
        await job.update({
          status: 'cancelled',
          funded: 0,
        });
        status = true;
      }
    }
    res.status(200).send(status);
  } catch (e) {
    console.error(e);
    res.status(500).send(status);
  }
});

paymentRouter.put('/stripe/complete/:id', async (req, res) => {
  let status = false;
  try {
    const { id } = req.params;
    const job = await Job.findOne({
      where: {
        id,
        status: 'pendingVerification',
      },
    });
    if (job) {
      if (!job.price) {
        await job.update({
          status: 'completed',
          funded: 0,
        });
        status = true;
        res.status(200).send({ status });
      } else if (job.price > 0) {
        const user = await User.findByPk(job.reservedUser);
        if (!user.stripe) {
          const stripeError = `${user.username} must complete Stripe Onboarding`;
          res.status(200).send({
            status,
            stripeError,
          });
        } else if (user.stripe) {
          await stripe.transfers.create({
            amount: job.funded * 0.9 * 100,
            currency: 'usd',
            destination: user.stripe,
          });
          const payments = await Payment.findAll({
            where: {
              jobId: id,
              type: 'deposit',
            },
            include: [
              {
                model: User,
              },
            ],
          });
          await payments.forEach(async payment => {
            if (payment.userId) {
              await Payment.create({
                type: 'payment',
                subject: `${job.name} has been completed and recipient has been paid`,
                amount: payment.amount,
                userId: payment.userId,
                jobId: payment.jobId,
              });
            }
          });
          await Payment.create({
            type: 'payment',
            subject: `${job.name} has been completed $(${
              job.funded * 0.9
            })  dollars has been transferred to your account`,
            amount: job.funded * 0.9,
            userId: user.id,
            jobId: job.id,
          });
          await job.update({
            status: 'completed',
            funded: 0,
          });
          status = true;
          res.status(200).send({ status });
        }
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(status);
  }
});

module.exports = {
  url: 'payment',
  router: paymentRouter,
};
