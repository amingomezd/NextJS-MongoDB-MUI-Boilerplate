import { ValidateProps } from '@/src/config/constants';
import { findUserByEmail, findUserByUsername, updateUserById } from '@/src/services/user';
import { auths, validateBody } from '@/middlewares';
import { ncOpts } from '@/src/config/nc';
import { slugUsername } from '@/src/common/utils';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import { jsonParser } from '@/src/common/utils/bodyParser';
import User from '@/src/services/user/data/User';
import bcrypt from 'bcryptjs';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret
  });
}

handler.use(...auths);

handler.get(async (req, res) => {
  const { publicUserData } = req.query;

  //   Get public data from user if the profile page is visited unauthenticated
  if (publicUserData) {
    const user = await findUserByUsername(publicUserData);
    return res.json(user);
  }

  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

// User Registration
handler.post(
  jsonParser,
  validateBody(
    {
      type: 'object',
      properties: {
        username: ValidateProps.user.username,
        name: ValidateProps.user.name,
        password: ValidateProps.user.password,
        email: ValidateProps.user.email
      },
      required: ['username', 'name', 'password', 'email'],
      additionalProperties: false
    },
    true
  ),
  async (req, res) => {
    let { username, name, email, password } = req.body;
    username = slugUsername(req.body.username);

    if (!isEmail(email)) {
      res.status(400).json({ error: { message: 'The email you entered is invalid.' } });
      return;
    }
    if (await findUserByEmail(email)) {
      res.status(403).json({ error: { message: 'The email has already been used.' } });
      return;
    }
    if (await findUserByUsername(username)) {
      res.status(403).json({ error: { message: 'The username has already been taken.' } });
      return;
    }

    const user = await User.create({
      email,
      originalPassword: await bcrypt.hash(password, 10),
      bio: '',
      name,
      username
    });

    req.logIn(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        user
      });
    });
  }
);

// User Profile Update
handler.patch(
  upload.single('profilePicture'),
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      bio: ValidateProps.user.bio
    },
    additionalProperties: true
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
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
        res.status(403).json({ error: { message: 'The username has already been taken.' } });
        return;
      }
    }

    const user = await updateUserById(req.user._id, {
      ...(username && { username }),
      ...(name && { name }),
      ...(typeof bio === 'string' && { bio }),
      ...(profilePicture && { profilePicture })
    });

    res.json({ user });
  }
);

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;
