import { passport } from '@/src/api/services/auth';
import session from './session';

const auths = [session, passport.initialize(), passport.session()];

export default auths;
