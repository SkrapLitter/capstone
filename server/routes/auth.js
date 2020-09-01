// const bcrypt = require('bcrypt');
const passport = require('passport');
const authRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const AWS = require('aws-sdk');
const multer = require('multer');
const { models } = require('../db');

const upload = multer();
const { Session, User } = models; // Order to be added
const defaultImage =
  'https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=1618390';
const singleUpload = upload.single('image');

dotenv.config();

authRouter.post('/upload', singleUpload, async (req, res) => {
  const { buffer, originalname } = req.file;

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: originalname,
    Body: buffer,
  };

  s3.upload(params, err => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  });

  res.status(201).send({ message: 'hello' });
});

authRouter.post(
  '/register',
  [
    check('username', 'Email is required').not().isEmpty(),
    check('username', 'Include a valid email').isEmail(),
    check('firstName', 'Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('password', 'Enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { username, password, firstName, lastName } = req.body;
      let { image } = req.body;

      image = image || defaultImage;

      const user = await User.create({
        username,
        password,
        firstName,
        lastName,
        image,
      });
      req.user = user;
      res.status(201).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  }
);

authRouter.post('/login', passport.authenticate('local'), async (req, res) => {
  try {
    const userId = req.user.id;
    let usersSession = await Session.findByPk(req.sessionId);

    if (!usersSession) {
      usersSession = await Session.create({ id: req.sessionId });
    }
    await usersSession.setUser(userId);

    res.status(200).send({
      user: req.user,
    });
  } catch (e) {
    req.status(404).send({
      message: 'user not found',
    });
  }
});

authRouter.get(
  '/facebook',
  passport.authenticate('facebook'),
  async (req, res) => {
    try {
      const userId = req.user.id;
      let usersSession = await Session.findByPk(req.sessionId);

      if (!usersSession) {
        usersSession = await Session.create({ id: req.sessionId });
      }
      await usersSession.setUser(userId);

      return res.redirect('/');
    } catch (e) {
      req.status(404).send({
        message: 'user not found',
      });
    }
  }
);

authRouter.get('/google', passport.authenticate('google'), async (req, res) => {
  try {
    const userId = req.user.id;
    let usersSession = await Session.findByPk(req.sessionId);

    if (!usersSession) {
      usersSession = await Session.create({ id: req.sessionId });
    }
    await usersSession.setUser(userId);

    return res.redirect('/');
  } catch (e) {
    req.status(404).send({
      message: 'user not found',
    });
  }
});

authRouter.get('/login', (req, res) => {
  try {
    if (req.user) {
      res.status(200).send({
        user: req.user,
      });
    } else {
      res.status(200).send({
        user: '',
      });
    }
  } catch (e) {
    console.error(e);
  }
});

authRouter.delete('/logout', (req, res) => {
  try {
    req.logOut();
    res.clearCookie('session_id');
    res.status(200).send({
      message: 'successfully deleted',
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = {
  url: 'auth',
  router: authRouter,
};
