const passport = require('passport');
const authRouter = require('express').Router();
const {
  models: { Session, User },
} = require('../db');

authRouter.post('/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    let { image } = req.body;
    if (username && password && firstName && lastName) {
      image = image ? image : 'https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=1618390';
      await User.create({
        username,
        password,
        firstName,
        lastName,
        image,
      });
      res.status(202).send({
        message: `user ${username} successfully created`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: ('error creating user', e),
    });
  }
});
authRouter.post('/login', passport.authenticate('local'), async function (req, res) {
  try {
    const userId = req.user.id;
    let usersSession = await Session.findByPk(req.sessionId);
    if (!usersSession) {
      usersSession = await Session.create({ id: req.sessionId });
    }
    await usersSession.setUser(userId);
    res.send({
      user: req.user,
      message: `${req.user.username} found`,
    });
  } catch (e) {
    req.status(501).send({
      message: 'user not found',
    });
  }
});
authRouter.get('/facebook', passport.authenticate('facebook'), async function (req, res) {
  try {
    const userId = req.user.id;
    let usersSession = await Session.findByPk(req.sessionId);
    if (!usersSession) {
      usersSession = await Session.create({ id: req.sessionId });
    }
    await usersSession.setUser(userId);
    return res.redirect('/');
  } catch (e) {
    req.status(501).send({
      message: 'user not found',
    });
  }
});
authRouter.get('/google', passport.authenticate('google'), async function (req, res) {
  try {
    const userId = req.user.id;
    let usersSession = await Session.findByPk(req.sessionId);
    if (!usersSession) {
      usersSession = await Session.create({ id: req.sessionId });
    }
    await usersSession.setUser(userId);
    return res.redirect('/');
  } catch (e) {
    req.status(501).send({
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

module.exports = authRouter;
