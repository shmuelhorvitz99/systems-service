import { Router } from 'express';
import { validateRequest, wrapController } from '../../utils/express/wrappers';
import { FeaturesController } from './controller';
import {
    createFeatureRequestSchema,
    deleteFeatureRequestSchema,
    getFeatureByIdRequestSchema,
    getFeaturesByQueryRequestSchema,
    getFeaturesCountRequestSchema,
    updateFeatureRequestSchema,
} from './validations';

export const featuresRouter = Router();

featuresRouter.get('/', validateRequest(getFeaturesByQueryRequestSchema), wrapController(FeaturesController.getFeaturesByQuery));

featuresRouter.get('/count', validateRequest(getFeaturesCountRequestSchema), wrapController(FeaturesController.getFeaturesCount));

featuresRouter.get('/:id', validateRequest(getFeatureByIdRequestSchema), wrapController(FeaturesController.getFeatureById));

featuresRouter.post('/', validateRequest(createFeatureRequestSchema), wrapController(FeaturesController.createFeature));

featuresRouter.put('/:id', validateRequest(updateFeatureRequestSchema), wrapController(FeaturesController.updateFeature));

featuresRouter.delete('/:id', validateRequest(deleteFeatureRequestSchema), wrapController(FeaturesController.deleteFeature));
