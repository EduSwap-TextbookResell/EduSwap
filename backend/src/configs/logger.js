import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json({ space: 2 }),
    winston.format.printf((info) => {
      const logMessage =
        typeof info.message === 'object'
          ? JSON.stringify(info.message, null, 2)
          : info.message;
      return `[${info.timestamp}] ${info.level.toUpperCase()}: ${logMessage}`;
    }),
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

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          const logMessage =
            typeof info.message === 'object'
              ? JSON.stringify(info.message, null, 2)
              : info.message;
          return `[${info.timestamp}] ${info.level}: ${logMessage}`;
        }),
      ),
    }),
  );
}

export default logger;
