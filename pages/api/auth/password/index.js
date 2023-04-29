import { ValidateProps } from '@/src/config/constants';
import { auths, validateBody } from '@/middlewares';
import { ncOpts } from '@/src/config/nc';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import * as authController from '@/src/api/controllers/authController';

const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))

  .put(
    validateBody({
      type: 'object',
      properties: {
        oldPassword: ValidateProps.user.password,
        newPassword: ValidateProps.user.password
      },
      required: ['oldPassword', 'newPassword'],
      additionalProperties: false
    }),
    authController.updateUserPassword
  )

  .get(authController.checkPasswordResetTokenValidity);

export default router.handler(ncOpts);
