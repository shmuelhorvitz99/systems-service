import { DocumentNotFoundError } from '../../utils/errors';
import { Feature, FeatureDocument } from './interface';
import { FeaturesModel } from './model';

export class FeaturesManager {
    static async getFeaturesByQuery(query: Partial<Feature>, step: number, limit?: number): Promise<FeatureDocument[]> {
        return FeaturesModel.find(query, {}, limit ? { limit, skip: limit * step } : {}).exec();
    }

    static async getFeaturesCount(query: Partial<Feature>): Promise<number> {
        return FeaturesModel.count(query);
    }

    static async getFeatureById(featureId: string): Promise<FeatureDocument> {
        return FeaturesModel.findById(featureId).orFail(new DocumentNotFoundError(featureId)).exec();
    }

    static async createFeature(feature: Feature): Promise<FeatureDocument> {
        return FeaturesModel.create(feature);
    }

    static async updateFeature(featureId: string, update: Partial<Feature>): Promise<FeatureDocument> {
        return FeaturesModel.findByIdAndUpdate(featureId, update, { new: true }).orFail(new DocumentNotFoundError(featureId)).exec();
    }

    static async deleteFeature(featureId: string): Promise<FeatureDocument> {
        return FeaturesModel.findByIdAndDelete(featureId).orFail(new DocumentNotFoundError(featureId)).exec();
    }
}
