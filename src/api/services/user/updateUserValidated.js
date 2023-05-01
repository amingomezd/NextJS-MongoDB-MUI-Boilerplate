import { slugUsername } from '@/src/common/utils';
import * as cloudinaryService from '@/src/api/services/cloudinary';
import User from '@/src/api/services/user/data/User';
import { httpError } from '@/middlewares/HttpError';

export const updateUserValidated = async ({ userId, name, bio, username, file }) => {
  let profilePicture;

  if (file) {
    profilePicture = await cloudinaryService.uploadPicture(file);
  }

  if (username) {
    username = slugUsername(username);

    if (await User.findUserByUsername(username)) {
      throw httpError(403, 'The username has already been taken.');
    }
  }

  return User.updateUserById(userId, {
    ...(username && { username }),
    ...(name && { name }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicture && { profilePicture })
  });
};
