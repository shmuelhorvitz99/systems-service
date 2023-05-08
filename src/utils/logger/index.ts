import winston from 'winston';

export const loggerOptions: winston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`),
    ),
};

export const logger = winston.createLogger(loggerOptions);
