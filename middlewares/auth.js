import passport, { addSessionFunctionsToRequest } from '@/src/api/lib/passport';
import session from './session';

// Look into future versions of passport.js that implement an option to disable the automatic regeneration of session
// and stop using/deprecate the workaround: "addSessionFunctionsToRequest"
const auths = [session, passport.initialize(), passport.session(), addSessionFunctionsToRequest];

export default auths;
