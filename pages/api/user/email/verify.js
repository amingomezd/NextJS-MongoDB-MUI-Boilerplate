import { auths } from '@/middlewares';
import { ncOpts } from '@/src/config/nc';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import userController from '@/src/api/controllers/userController';

const router = createRouter();

router
  .use(...auths)
  .use(expressWrapper(cors()))

  .post(userController.sendVerificationEmail);

export default router.handler(ncOpts);
