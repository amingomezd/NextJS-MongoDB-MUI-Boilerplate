import { ncOpts } from '@/src/config/nc';
import { auths } from '@/middlewares';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import authController from '@/src/api/controllers/authController';

const router = createRouter();

router
  .use(expressWrapper(cors()))
  .use(...auths)

  .get(authController.checkPasswordResetTokenValidity);

export default router.handler(ncOpts);
