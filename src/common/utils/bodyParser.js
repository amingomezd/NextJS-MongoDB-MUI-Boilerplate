import bodyParser from 'body-parser';

export const jsonParser = bodyParser.json();
export const urlencodedParser = bodyParser.urlencoded({ extended: true });
