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
const {
  findUserBySession,
  findUserIncludeSessions,
  createAlert,
} = require('./utils');
const {
  models: { Chatroom, ChatMessage },
} = require('./db');
const { default: Axios } = require('axios');
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
  Axios.put(`http://localhost:3000/api/user/socketConnect/${socket.id}`);
  socket.on('message', async data => {
    try {
      const { chatroomId, author, message, recipient, title } = data;
      const newMessage = await ChatMessage.create({
        chatroomId,
        author,
        message,
        recipient,
      });
      const chatroom = await Chatroom.findByPk(chatroomId);
      await chatroom.update({
        [title]: chatroom[title] + 1,
      });
      const user = await findUserIncludeSessions(recipient);
      await user.sessions.forEach(session => {
        if (session.socket in io.sockets.connected) {
          io.to(session.socket).emit('newMessage', {
            newMessage,
            recipient,
          });
        }
      });
      io.to(socket.id).emit('newMessage', { newMessage, author });
    } catch (e) {
      console.error('socket error', e);
    }
  });
  socket.on('reserve', async data => {
    const user = await findUserIncludeSessions(data.userId);
    const subject = `${data.name} has been reserved by ${data.reservedUsername}`;
    const reservedSubject = `You have reserved ${data.name} posted by ${data.createdUser}`;
    const userAlert = await createAlert(user.id, subject);
    await createAlert(data.reservedUser, reservedSubject);
    await user.sessions.forEach(session => {
      if (session.socket in io.sockets.connected) {
        io.to(session.socket).emit('alert', userAlert);
      }
    });
  });
  socket.on('unreserve', async (data, id) => {
    const user = await findUserIncludeSessions(data.userId);
    const reservedSubject = `You have unreserved from ${data.name} posted by ${data.createdUser}`;
    const subject = `${data.name} has been unreserved and is now open for reservations`;
    const userAlert = await createAlert(user.id, subject);
    await createAlert(id, reservedSubject);
    await user.sessions.forEach(session => {
      if (session.socket in io.sockets.connected) {
        io.to(session.socket).emit('alert', userAlert);
      }
    });
  });
  socket.on('complete', async data => {
    const user = await findUserIncludeSessions(data.reservedUser);
    const reservedSubject = `You have completed ${data.name} and payment has been paid from ${data.createdUser}`;
    const subject = `${data.name} has been completed and payment has been completed`;
    const userAlert = await createAlert(user.id, reservedSubject);
    await createAlert(data.userId, subject);
    await user.sessions.forEach(session => {
      if (session.socket in io.sockets.connected) {
        io.to(session.socket).emit('alert', userAlert);
      }
    });
  });
  socket.on('stripeError', async data => {
    const { job, stripeError } = data;
    const user = await findUserIncludeSessions(job.reservedUser);
    const reservedSubject = `${job.name} cannot be completed due to stripe account not set up. Please complete onboarding!`;
    const subject = `${job.name} cannot be completed due to ${stripeError}`;
    const userAlert = await createAlert(user.id, reservedSubject);
    await createAlert(job.userId, subject);
    await user.sessions.forEach(session => {
      if (session.socket in io.sockets.connected) {
        io.to(session.socket).emit('alert', userAlert);
      }
    });
  });
  socket.on('pendingVerification', async data => {
    const user = await findUserIncludeSessions(data.userId);
    const reservedSubject = `You have verified ${data.name} and payment is pending until ${data.createdUser} has verified job completion`;
    const subject = `${data.name} has been verified, please approve or give user further instructions to complete verification`;
    const userAlert = await createAlert(user.id, subject);
    await createAlert(data.reservedId, reservedSubject);
    await user.sessions.forEach(session => {
      if (session.socket in io.sockets.connected) {
        io.to(session.socket).emit('alert', userAlert);
      }
    });
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
        if (!data) {
          Session.create({
            id: req.sessionId,
          });
        }
        return findUserBySession(req.sessionId);
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
