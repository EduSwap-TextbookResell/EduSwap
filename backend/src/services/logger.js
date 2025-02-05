import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

import { config } from '../configs/index.js';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json({ space: 2 }),
  ),
  transports: [
    new DailyRotateFile({
      dirname: path.resolve('logs'),
      filename: 'logs-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

if (config.env === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  );
}

export default logger;
