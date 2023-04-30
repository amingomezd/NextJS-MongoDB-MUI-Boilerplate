import { ValidateProps } from '@/src/config/constants';
import { auths, validateBody } from '@/middlewares';
import { ncOpts } from '@/src/config/nextConnectConfig';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import * as authController from '@/src/api/controllers/authController';

const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))

  .post(
    validateBody({
      type: 'object',
      properties: {
        email: ValidateProps.user.email
      },
      required: ['email'],
      additionalProperties: false
    }),
    authController.requestPasswordReset
  )

  .put(
    validateBody({
      type: 'object',
      properties: {
        password: ValidateProps.user.password,
        token: { type: 'string', minLength: 0 }
      },
      required: ['password', 'token'],
      additionalProperties: false
    }),
    authController.resetPasswordWithToken
  );

export default router.handler(ncOpts);
