import { slugUsername } from '@/src/common/utils';
import isEmail from 'validator/lib/isEmail';
import { findUserByEmail, findUserByUsername } from '@/src/api/services/user/index';
import User from '@/src/api/services/user/data/User';
import bcrypt from 'bcryptjs';

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
export const validateAndCreateUser = async ({ username, name, email, password }) => {
  const normalizedUsername = slugUsername(username);

  if (!isEmail(email)) {
    return { error: { message: 'The email you entered is invalid.', code: 400 } };
  }
  if (await findUserByEmail(email)) {
    return { error: { message: 'The email has already been used.', code: 403 } };
  }
  if (await findUserByUsername(normalizedUsername)) {
    return { error: { message: 'The username has already been taken.', code: 403 } };
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
    throw Error('An error occurred while registering user');
  }

  return { user };
};
