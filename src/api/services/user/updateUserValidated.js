import { slugUsername } from '@/src/common/utils';
import * as cloudinaryService from '@/src/api/services/cloudinary';
import User from '@/src/api/services/user/data/User';

export const updateUserValidated = async ({ userId, name, bio, username, file }) => {
  let profilePicture;

  if (file) {
    profilePicture = await cloudinaryService.uploadPicture(file);
  }

  if (username) {
    username = slugUsername(username);

    if (await User.findUserByUsername(username)) {
      return { error: { message: 'The username has already been taken.', code: 403 } };
    }
  }

  const user = await User.updateUserById(userId, {
    ...(username && { username }),
    ...(name && { name }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicture && { profilePicture })
  });

  return { user };
};
