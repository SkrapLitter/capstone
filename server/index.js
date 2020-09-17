/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
require('./config/passport');
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const { app, http } = require('./server');
const routers = require('./routes');
const {
  models: { Session, User },
} = require('./db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { findUserBySession } = require('./utils');
const {
  models: { Chatroom, ChatMessage, Alert },
} = require('./db');
const io = require('socket.io')(http);

dotenv.config();
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

io.on('connection', socket => {
  socket.on('message', async data => {
    try {
      const { chatroomId, author, message, userId } = data;
      await ChatMessage.create({
        chatroomId,
        author,
        message,
        userId,
      });
      const chatroom = await Chatroom.findByPk(chatroomId);
      const users = chatroom.chatusers.split('/').filter(id => id !== userId);
      await users.forEach(async id => {
        await Alert.create({
          subject: `New Message Received From ${author} in ${chatroom.name}`,
          userId: id,
        });
        const user = await User.findByPk(id);
        if (user) {
          io.to(user.socket).emit('alert', id);
          io.to(user.socket).emit('newMessage', chatroom);
        }
      });
      io.to(socket.id).emit('newMessage', chatroom);
    } catch (e) {
      console.error('socket error', e);
    }
  });
  socket.on('reserveJob', async data => {
    const { jobName, userId, reservedName } = data;
    const user = User.findByPk(userId);
    await Alert.create({
      subject: `${jobName} reserved by ${reservedName}`,
      userId: user.id,
    });
    io.to(user.socket).emit('alert', user.id);
  });
});
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
          user.update({
            socket: req.cookies.io,
          });
          req.user = user.dataValues;
          next();
        } else {
          next();
        }
      })
      .catch(e => console.error(e));
  }
});

routers.forEach(({ url, router }) => {
  app.use(`/api/${url}`, router);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const startServer = () => {
  http.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is listening on PORT: ${PORT}`));
  });
};

startServer();
