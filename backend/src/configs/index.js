import db from './db.js';
import env from './env.js';
import jwtSecret from './jwt.js';

export const config = {
  jwtSecret,
  db,
  env,
};
