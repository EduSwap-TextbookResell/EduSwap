import db from './db.js';
import env from './env.js';
import general from './general.js';
import jwtSecret from './jwt.js';

export const config = {
  jwtSecret,
  db,
  env,
  general,
};
