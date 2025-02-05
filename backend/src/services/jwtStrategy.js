import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import User from '../models/user.js';
import { config } from '../configs/index.js';

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    },
    function (payload, done) {
      User.findById(payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => done(err));
    },
  ),
);
