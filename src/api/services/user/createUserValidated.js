import { slugUsername } from '@/src/common/utils';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import User from '@/src/api/services/user/data/User';
import { httpError } from '@/middlewares/HttpError';

/**
 * Validates user input and creates a new user.
 *
 * @async
 * @param {object} userObj - An object containing user input data.
 * @param {string} userObj.username - The username for the new user.
 * @param {string} userObj.name - The name of the new user.
 * @param {string} userObj.email - The email address of the new user.
 * @param {string} userObj.password - The password for the new user.
 * @returns {Promise<{user: {}}|{error: {message: string, code: number}}>} Resolves to an object with either a `user`
 * property, containing the newly created user document, or an `error`.
 * @throws {Error} If an error occurs while creating the user.
 */
export const createUserValidated = async ({ username, name, email, password }) => {
  const normalizedUsername = slugUsername(username);

  if (!isEmail(email)) {
    throw httpError(400, 'The email you entered is invalid.');
  }
  if (await User.findUserByEmail(email)) {
    throw httpError(403, 'The email has already been used.');
  }
  if (await User.findUserByUsername(normalizedUsername)) {
    throw httpError(403, 'The username has already been taken.');
  }

  let user;

  try {
    user = await User.create({
      email,
      originalPassword: await bcrypt.hash(password, 10),
      bio: '',
      name,
      username: normalizedUsername
    });
  } catch (e) {
    console.error(e);
    throw httpError(503, 'An error occurred while registering user');
  }

  return user;
};
