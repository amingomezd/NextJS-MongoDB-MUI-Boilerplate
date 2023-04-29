import { findUserByUsername, updateUserById } from '@/src/api/services/user';
import { slugUsername } from '@/src/common/utils';
import { v2 as cloudinary } from 'cloudinary';
import { validateAndCreateUser } from '@/src/api/services/user/validateAndCreateUser';

export const getCurrentUser = async (req, res) => {
  const { publicUserData } = req.query;

  //   Get public data from user if the profile page is visited unauthenticated
  if (publicUserData) {
    const user = await findUserByUsername(publicUserData);
    return res.json(user);
  }

  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
};

export const registerUser = async (req, res) => {
  const { username, name, email, password } = req.body;

  const { user, error } = await validateAndCreateUser({ username, name, email, password });

  if (error) return res.status(error.code).send({ error: error.message });

  req.logIn(user, (err) => {
    if (err) throw err;
    return res.status(201).json({
      user
    });
  });
};

export const updateUserProfile = async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  if (process.env.CLOUDINARY_URL) {
    const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(process.env.CLOUDINARY_URL);

    cloudinary.config({
      cloud_name,
      api_key,
      api_secret
    });
  }

  let profilePicture;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill'
    });
    profilePicture = image.secure_url;
  }
  const { name, bio } = req.body;

  let username;

  if (req.body.username) {
    username = slugUsername(req.body.username);
    // TODO: this validation looks weird, refactor it later
    if (username !== req.user.username && (await findUserByUsername(username))) {
      return res.status(403).json({ error: { message: 'The username has already been taken.' } });
    }
  }

  const user = await updateUserById(req.user._id, {
    ...(username && { username }),
    ...(name && { name }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicture && { profilePicture })
  });

  return res.json({ user });
};
