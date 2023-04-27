import { ValidateProps } from '@/src/config/constants';
import { validateBody } from '@/middlewares';
import { ncOpts } from '@/src/config/nc';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import userController from '@/src/api/controllers/userController';

const router = createRouter();

router
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
    userController.sendPasswordResetEmail
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
    userController.updatePasswordWithToken
  );

export default router.handler(ncOpts);
