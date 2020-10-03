require('dotenv').config();
const photoRouter = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const { models } = require('../db');

const upload = multer();

const { Image, Job, Verification } = models;

const singleUpload = upload.single('image');
const multipleUpload = upload.array('image');

photoRouter.post('/jobphoto/:id', singleUpload, async (req, res) => {
  const { buffer, originalname } = req.file;
  const { id } = req.params;

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID2,
    secretAccessKey: process.env.AWS_SECRET2,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME2,
    Key: originalname,
    Body: buffer,
    ACL: 'public-read',
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    } else {
      // eslint-disable-next-line
      const image = await Image.create({
        url: data.Location,
        jobId: id,
      });
      const job = await Job.findOne({
        where: {
          id,
        },
        include: [Image],
      });
      res.status(201).send(job);
    }
  });
});

photoRouter.post('/jobphoto', singleUpload, async (req, res) => {
  const { buffer, originalname } = req.file;

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID2,
    secretAccessKey: process.env.AWS_SECRET2,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME2,
    Key: originalname,
    Body: buffer,
    ACL: 'public-read',
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    } else {
      const image = await Image.create({
        url: data.Location,
      });
      res.status(201).send(image);
    }
  });
});

photoRouter.post('/verificationphoto/:id', multipleUpload, async (req, res) => {
  const file = req.files;
  const { id } = req.params;
  const userId = req.user.id;
  const bucketName = { Bucket: userId };

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
  try {
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
          await Verification.create({
            url: img.Location,
            jobId: id,
            userId: userId,
          });
        });
      })
      .then(async () => {
        await Job.update(
          { status: 'pendingVerification' },
          { where: { id: id } }
        );
        const job = await Job.findOne({
          where: {
            id,
          },
          include: [Image, Verification],
        });
        res.status(201).send(job);
      });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = {
  url: 'photo',
  router: photoRouter,
};
