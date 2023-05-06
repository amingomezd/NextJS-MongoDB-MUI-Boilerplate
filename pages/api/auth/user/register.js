import { createRouter, expressWrapper } from 'next-connect';
import { auths, validateBody } from '@/middlewares';
import cors from 'cors';
import * as userController from '@/src/api/controllers/userController';
import { jsonParser } from '@/src/common/utils/bodyParser';
import { ValidateProps } from '@/src/config/constants';
import { ncOpts } from '@/src/config/nextConnectConfig';

const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))

  // User Registration
  .post(
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
    userController.registerUser
  );

export default router.handler(ncOpts);
