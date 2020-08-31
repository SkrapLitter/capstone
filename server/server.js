require('./config/passport');
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const app = require('./index');
const { authRouter, jobRouter } = require('./routes');
const {
  models: { Session },
} = require('./db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { findUserBySession } = require('./utils');

dotenv.config();
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');

app.use('/api/auth', authRouter);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.use(async (req, res, next) => {
  if (!req.cookies.session_id) {
    const session = await Session.create();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    res.cookie('session_id', session.id, {
      path: '/',
      expires: new Date(Date.now() + oneWeek),
    });
    req.sessionId = session.id;
    next();
  } else {
    req.sessionId = req.cookies.session_id;
    Session.findByPk(req.cookies.session_id)
      .then(data => {
        if (!data)
          Session.create({
            id: req.sessionId,
          });
        const user = findUserBySession(req.sessionId);
        return user;
      })
      .then(user => {
        if (user) {
          req.user = user.dataValues;
          next();
        } else {
          next();
        }
      })
      .catch(e => console.error(e));
  }
});
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const startServer = () =>
  new Promise(() => {
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`Server is listening on PORT: ${PORT}`));
    });
  });

module.exports = startServer;
