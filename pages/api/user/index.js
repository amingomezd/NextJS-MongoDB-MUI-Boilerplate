import { ValidateProps } from '@/src/config/constants';
import { findUserByEmail, findUserByUsername, insertUser, updateUserById } from '@/src/services/user';
import { auths, validateBody } from 'middlewares';
import { getMongoDb } from '@/src/services/mongodb';
import { ncOpts } from '@/src/config/nc';
import { slugUsername } from '@/src/common/utils';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';
import normalizeEmail from 'validator/lib/normalizeEmail';
import isEmail from 'validator/lib/isEmail';
import { jsonParser } from '@/src/common/utils/bodyParser';

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
  ...auths,
  async (req, res) => {
    const db = await getMongoDb();

    let { username, name, email, password } = req.body;
    username = slugUsername(req.body.username);
    email = normalizeEmail(req.body.email);
    if (!isEmail(email)) {
      res.status(400).json({ error: { message: 'The email you entered is invalid.' } });
      return;
    }
    if (await findUserByEmail(db, email)) {
      res.status(403).json({ error: { message: 'The email has already been used.' } });
      return;
    }
    if (await findUserByUsername(db, username)) {
      res.status(403).json({ error: { message: 'The username has already been taken.' } });
      return;
    }
    const user = await insertUser(db, {
      email,
      originalPassword: password,
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

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

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

    const db = await getMongoDb();

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
      if (username !== req.user.username && (await findUserByUsername(db, username))) {
        res.status(403).json({ error: { message: 'The username has already been taken.' } });
        return;
      }
    }

    const user = await updateUserById(db, req.user._id, {
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
