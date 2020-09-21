require('dotenv').config();
const photoRouter = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const { models } = require('../db');

const upload = multer();
const { Image, Job } = models;
const singleUpload = upload.single('image');

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

module.exports = {
  url: 'photo',
  router: photoRouter,
};
