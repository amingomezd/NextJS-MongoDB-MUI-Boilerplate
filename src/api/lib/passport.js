import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '@/src/api/services/user/data/User';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  return User.findUserForAuth(id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    const user = await User.findUserWithEmailAndPassword(email, password);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Email or password is incorrect' });
    }
  })
);

export default passport;
