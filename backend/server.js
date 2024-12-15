import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import logger from './src/services/logger.js';
import routes from './src/routes/index.js';
import { config } from './src/configs/index.js';
import './src/services/jwtStrategy.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

app.use((req, res, next) => {
  const { method, url, headers, body, params, ip } = req;
  logger.info({
    method,
    url,
    headers: {
      ...headers,
      authorization: '*****',
    },
    body: Object.keys(body).length > 0 ? body : undefined,
    params,
    ip,
  });
  next();
});

mongoose
  .connect(config.db.url)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use('/', routes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Running at http://localhost:${port}/api`);
});
