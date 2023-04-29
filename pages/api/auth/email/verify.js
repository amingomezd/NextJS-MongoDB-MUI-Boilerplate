import { auths } from '@/middlewares';
import { ncOpts } from '@/src/config/nc';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import * as authController from '@/src/api/controllers/authController';

const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))

  .post(authController.sendVerificationEmail)

  .get(authController.verifyEmailByToken);

export default router.handler(ncOpts);
