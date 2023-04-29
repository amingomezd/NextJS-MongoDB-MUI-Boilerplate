import { passport } from '@/src/api/services/auth';
import { ncOpts } from '@/src/config/nc';
import { auths } from '@/middlewares';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import * as authController from '@/src/api/controllers/authController';
import { responseTime } from '@/middlewares/responseTime';

const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))
  .use(responseTime)

  // User login
  .post(passport.authenticate('local'), authController.getAuthenticatedUser)

  .delete(authController.logout);

export default router.handler(ncOpts);
