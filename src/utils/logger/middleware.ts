import expressWinston from 'express-winston';
import { loggerOptions } from '.';

export const loggerMiddleware = expressWinston.logger({
    ...(loggerOptions as expressWinston.LoggerOptions),
    expressFormat: true,
    statusLevels: true,
});
