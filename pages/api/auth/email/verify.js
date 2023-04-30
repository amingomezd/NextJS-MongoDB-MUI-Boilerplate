import { auths } from '@/middlewares';
import { ncOpts } from '@/src/config/nextConnectConfig';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import * as authController from '@/src/api/controllers/authController';
import { requireLoggedInUser } from '@/middlewares/requireAuth';

const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))

  .post(requireLoggedInUser, authController.sendVerificationEmail)

  .get(authController.verifyEmail);

export default router.handler(ncOpts);
