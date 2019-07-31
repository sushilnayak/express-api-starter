import winston from "winston";

const { splat, combine, timestamp, printf } = winston.format;

const myFormat = printf(({ timestamp, level, message, meta }) => {
  return `${timestamp} [${process.env.APP_NAME}-${process.env.APP_VERSION}] [${level}] ${message.trim()} ${meta ? JSON.stringify(meta) : ""}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    splat(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export const logStream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

export default logger;
