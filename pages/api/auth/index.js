import passport, { addSessionFunctionsToRequest } from '@/src/api/lib/passport';
import { ncOpts } from '@/src/config/nextConnectConfig';
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
  // Look into future versions of passport.js that implement an option to disable the automatic regeneration of session
  // and stop using/deprecate the workaround: "addSessionFunctionsToRequest"
  .post(addSessionFunctionsToRequest, passport.authenticate('local'), authController.getAuthenticatedUser)

  .delete(authController.logout);

export default router.handler(ncOpts);
