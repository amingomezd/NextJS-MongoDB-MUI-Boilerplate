import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserWithEmailAndPassword } from '@/src/api/services/auth/getUserWithEmailAndPassword';
import { getUserForAuth } from '@/src/api/services/auth/getUserForAuth';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  return getUserForAuth(id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    const user = await getUserWithEmailAndPassword(email, password);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Email or password is incorrect' });
    }
  })
);

export const addSessionFunctionsToRequest = (req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
};

export default passport;
