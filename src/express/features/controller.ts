import { Response } from 'express';
import { TypedRequest } from '../../utils/zod';
import { FeaturesManager } from './manager';
import {
    createOneRequestSchema,
    deleteOneRequestSchema,
    getByIdRequestSchema,
    getByQueryRequestSchema,
    getCountRequestSchema,
    updateOneRequestSchema,
} from './validations';

export class FeaturesController {
    static async getByQuery(req: TypedRequest<typeof getByQueryRequestSchema>, res: Response) {
        const { step, limit, ...query } = req.query;

        res.json(await FeaturesManager.getByQuery(query, step, limit));
    }

    static async getCount(req: TypedRequest<typeof getCountRequestSchema>, res: Response) {
        res.json(await FeaturesManager.getCount(req.query));
    }

    static async getById(req: TypedRequest<typeof getByIdRequestSchema>, res: Response) {
        res.json(await FeaturesManager.getById(req.params.id));
    }

    static async createOne(req: TypedRequest<typeof createOneRequestSchema>, res: Response) {
        res.json(await FeaturesManager.createOne(req.body));
    }

    static async updateOne(req: TypedRequest<typeof updateOneRequestSchema>, res: Response) {
        res.json(await FeaturesManager.updateOne(req.params.id, req.body));
    }

    static async deleteOne(req: TypedRequest<typeof deleteOneRequestSchema>, res: Response) {
        res.json(await FeaturesManager.deleteOne(req.params.id));
    }
}
