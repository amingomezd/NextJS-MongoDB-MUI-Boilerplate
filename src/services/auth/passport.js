import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserForAuth, findUserWithEmailAndPassword } from '@/src/services/user';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  return findUserForAuth(id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    const user = await findUserWithEmailAndPassword(email, password);

    if (user) done(null, user);
    else done(null, false, { message: 'Email or password is incorrect' });
  })
);

export default passport;
