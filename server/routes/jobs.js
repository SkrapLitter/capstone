require('dotenv').config();
const jobRouter = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const {
  models: { Job, Image, Payment, Verification },
} = require('../db');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const axios = require('axios');
const User = require('../db/models/user');

const upload = multer();
const multipleUpload = upload.array('image');

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
              [Op.or]: [
                {
                  status: 'funded',
                },
                {
                  status: 'volunteer',
                },
              ],
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
      include: [Image, User, Verification],
    });
    res.status(200).send(job);
  } catch (e) {
    res.sendStatus(500);
    console.error('error finding job', e);
  }
});

jobRouter.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await Job.findAll({
      where: {
        userId: id,
      },
      include: [Image, Payment],
    });
    const completed = jobs.filter(job => job.status === 'completed');
    const cancelled = jobs.filter(job => job.status === 'cancelled');
    const pendingVerification = jobs.filter(
      job => job.status === 'pendingVerification'
    );
    const pending = jobs.filter(job => job.status === 'pending');
    const active = jobs.filter(
      job => job.status === 'volunteer' || job.status === 'funded'
    );

    res.status(200).send({
      completed,
      cancelled,
      pendingVerification,
      pending,
      active,
    });
  } catch (e) {
    res.sendStatus(500);
    console.error('error finding job', e);
  }
});

jobRouter.post('/', multipleUpload, async (req, res) => {
  try {
    const file = req.files;
    const { name, price, userId, description, status } = req.body;
    let { address } = req.body;
    address = JSON.parse(address);
    const bucketName = { Bucket: userId };
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

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ID2,
      secretAccessKey: process.env.AWS_SECRET2,
    });

    s3.createBucket(bucketName, (err, data) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('success', data);
      }
    });
    const promises = [];
    file.forEach(img => {
      const params = {
        Bucket: bucketName.Bucket,
        Key: img.originalname,
        Body: img.buffer,
        ACL: 'public-read',
      };
      const promise = s3.upload(params).promise();
      promises.push(promise);
    });

    Promise.all(promises)
      .then(async data => {
        data.forEach(async img => {
          await Image.create({
            url: img.Location,
            jobId: job.id,
          });
        });
      })
      .then(() => {
        res.status(201).send(job);
      });
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
            // eslint-disable-next-line
            const { name, address, description, userId } = req.body;
            let city;
            let state;
            let lat;
            let lng;
            if (address) {
              city = address.value.structured_formatting.secondary_text.split(
                ', '
              )[0];
              state = address.value.structured_formatting.secondary_text.split(
                ', '
              )[1];
              const geocodeData = await axios
                .get(
                  `https://maps.googleapis.com/maps/api/geocode/json?place_id=${encodeURI(
                    `${address.value.place_id}`
                  )}&key=${process.env.GEOCODE_KEY}`
                )
                .then(response => response.data);

              lat = geocodeData.results[0].geometry.location.lat;
              lng = geocodeData.results[0].geometry.location.lng;
            }
            const options = () => {
              const optionObj = {};
              const keys = Object.keys(req.body);
              keys.forEach(key => {
                if (key !== 'type') {
                  if (req.body[key] && req.body[key] !== job[key])
                    optionObj[key] = req.body[key];
                  if (key === 'address') {
                    if (address) {
                      optionObj.city = city;
                      optionObj.state = state;
                      optionObj.lat = lat;
                      optionObj.lng = lng;
                      optionObj.address =
                        address.value.structured_formatting.main_text;
                    }
                  }
                }
              });
              return optionObj;
            };
            await job.update(options());
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

jobRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { jobId } = req.query;
  // TODO - DELETE PHOTO FROM AMAZON
  try {
    const image = await Image.findByPk(id);
    await image.destroy();
    const job = await Job.findOne({
      where: {
        id: jobId,
      },
      include: [Image],
    });
    res.status(200).send(job);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = {
  url: 'jobs',
  router: jobRouter,
};
