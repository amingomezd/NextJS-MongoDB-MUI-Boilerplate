import { createUserValidated } from '@/src/api/services/user/createUserValidated';
import { updateUserValidated } from '@/src/api/services/user/updateUserValidated';
import { getUserByUsername } from '@/src/api/services/user/getUserByUsername';

export const getCurrentUser = async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
};

export const getPublicUser = async (req, res) => {
  const { username } = req.body;

  const result = await getUserByUsername({ username });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });
  return res.json(result.user);
};

export const registerUser = async (req, res) => {
  const { username, name, email, password } = req.body;
  const result = await createUserValidated({ username, name, email, password });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });

  req.logIn(result.user, (err) => {
    if (err) throw err;
    return res.status(201).json({
      user: result.user
    });
  });
};

export const updateUserProfile = async (req, res) => {
  const { name, bio, username, file } = req.body;

  const result = await updateUserValidated({ userId: req.user._id, name, bio, username, file });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });
  return res.json({ user: result.user });
};
