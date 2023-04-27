import { ValidateProps } from '@/src/config/constants';
import { auths, validateBody } from '@/middlewares';
import { ncOpts } from '@/src/config/nc';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import userController from '@/src/api/controllers/userController';

const router = createRouter();

router
  .use(expressWrapper(cors()))
  .use(...auths)

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
    userController.updateUserPassword
  );

export default router.handler(ncOpts);
