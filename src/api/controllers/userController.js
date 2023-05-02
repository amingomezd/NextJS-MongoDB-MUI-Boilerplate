import { createUserValidated } from '@/src/api/services/user/createUserValidated';
import { updateUserValidated } from '@/src/api/services/user/updateUserValidated';
import { getUserByUsername } from '@/src/api/services/user/getUserByUsername';
import { responseHelper } from '@/middlewares/responseHelper';
import { httpError } from '@/middlewares/HttpError';

export const getCurrentUser = responseHelper((req) => {
  if (!req.user) return null;
  return { user: req.user };
});

export const getPublicUser = responseHelper(async (req) => {
  const { username } = req.body;
  const user = await getUserByUsername({ username });
  return { user };
});

export const registerUser = responseHelper(async (req) => {
  const { username, name, email, password } = req.body;
  const user = await createUserValidated({ username, name, email, password });

  req.logIn(user, (err) => {
    if (err) throw httpError(401, 'User registered. Error while trying to login, please try to login.');
  });

  return { user };
});

export const updateUserProfile = responseHelper(async (req) => {
  const { name, bio, username, file } = req.body;
  const user = await updateUserValidated({ userId: req.user._id, name, bio, username, file });
  return { user };
});
