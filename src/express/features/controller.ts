import { Response } from 'express';
import { TypedRequest } from '../../utils/zod';
import { FeaturesManager } from './manager';
import {
    createFeatureRequestSchema,
    deleteFeatureRequestSchema,
    getFeatureByIdRequestSchema,
    getFeaturesByQueryRequestSchema,
    getFeaturesCountRequestSchema,
    updateFeatureRequestSchema,
} from './validations';

export class FeaturesController {
    static async getFeaturesByQuery(req: TypedRequest<typeof getFeaturesByQueryRequestSchema>, res: Response) {
        const { step, limit, ...query } = req.query;

        res.json(await FeaturesManager.getFeaturesByQuery(query, step, limit));
    }

    static async getFeaturesCount(req: TypedRequest<typeof getFeaturesCountRequestSchema>, res: Response) {
        res.json(await FeaturesManager.getFeaturesCount(req.query));
    }

    static async getFeatureById(req: TypedRequest<typeof getFeatureByIdRequestSchema>, res: Response) {
        res.json(await FeaturesManager.getFeatureById(req.params.id));
    }

    static async createFeature(req: TypedRequest<typeof createFeatureRequestSchema>, res: Response) {
        res.json(await FeaturesManager.createFeature(req.body));
    }

    static async updateFeature(req: TypedRequest<typeof updateFeatureRequestSchema>, res: Response) {
        res.json(await FeaturesManager.updateFeature(req.params.id, req.body));
    }

    static async deleteFeature(req: TypedRequest<typeof deleteFeatureRequestSchema>, res: Response) {
        res.json(await FeaturesManager.deleteFeature(req.params.id));
    }
}
