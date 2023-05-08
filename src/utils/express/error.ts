import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ServiceError } from '../errors';

export const errorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    /* istanbul ignore else */
    if (error instanceof ZodError) {
        res.status(400).send({
            type: error.name,
            message: error.message,
        });
    } else if (error instanceof ServiceError) {
        res.status(error.code).send({
            type: error.name,
            message: error.message,
        });
    } else {
        /* istanbul ignore next */
        res.status(500).send({
            type: error.name,
            message: error.message,
        });
    }

    next();
};
