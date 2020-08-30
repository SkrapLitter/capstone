const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  models: { User },
} = require('../db');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

dotenv.config();

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({
      where: {
        username,
      },
    })
      .then(function (user) {
        if (!user) {
          return done(null, false, {
            message: 'Username does not exist',
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        const userinfo = user.get();
        return done(null, userinfo);
      })
      .catch(function (err) {
        console.log('Error:', err);

        return done(null, false, {
          message: 'Something went wrong with your Signin',
        });
      });
  })
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['email', 'name', 'photos', 'id'],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: {
            username: profile.emails[0].value,
          },
        });
        if (existingUser) {
          done(null, existingUser.dataValues);
        } else if (!existingUser) {
          const newUser = await User.create({
            username: profile.emails[0].value,
            password: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            salt: 'facebook',
            image: profile.photos[0].value,
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      profileFields: ['email', 'name', 'photos', 'id'],
      scope: ['email', 'profile', 'openid'],
    },
    async (accessToken, refreshToken, profile, scope, done) => {
      try {
        const existingUser = await User.findOne({
          where: {
            username: scope.emails[0].value,
          },
        });
        if (existingUser) {
          done(null, existingUser.dataValues);
        } else if (!existingUser) {
          const newUser = await User.create({
            username: scope.emails[0].value,
            password: scope.id,
            firstName: scope.name.givenName,
            lastName: scope.name.familyName,
            salt: 'google',
            image: scope.photos[0].value,
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(
    () =>
      function (err, user) {
        done(err, user);
      }
  );
});
