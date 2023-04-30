import { ValidateProps } from '@/src/config/constants';
import { auths, validateBody } from '@/middlewares';
import { ncOpts } from '@/src/config/nextConnectConfig';
import multer from 'multer';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import * as userController from '@/src/api/controllers/userController';
import { requireLoggedInUser } from '@/middlewares/requireAuth';
import { jsonParser } from '@/src/common/utils/bodyParser';

const upload = multer({ dest: '/tmp' });
const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))

  .get(userController.getCurrentUser)

  .post(
    jsonParser,
    validateBody(
      {
        type: 'object',
        properties: {
          username: ValidateProps.user.username
        },
        required: ['username'],
        additionalProperties: false
      },
      true
    ),
    userController.getPublicUser
  )

  .patch(
    requireLoggedInUser,
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
    userController.updateUserProfile
  );

// TODO: resolve the warning in console showing: "API resolved without sending a response"
// it can be hidden adding "externalResolver: true" to config.api, but it's not ideal.
// This message is being caused by passport.js resolving endpoints before getting here.
export const config = {
  api: {
    bodyParser: false
  }
};

export default router.handler(ncOpts);
