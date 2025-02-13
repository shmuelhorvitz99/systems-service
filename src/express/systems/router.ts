import { Router } from 'express';
import { validateRequest, wrapController } from '../../utils/express/wrappers.js';
import { SystemsController } from './controller.js';
import { createOneRequestSchema, deleteOneRequestSchema, getAllRequestSchema, getByIdRequestSchema, updateOneRequestSchema } from './validations.js';

export const systemsRouter = Router();

systemsRouter.get('/', validateRequest(getAllRequestSchema), wrapController(SystemsController.getAll));

systemsRouter.get('/:id', validateRequest(getByIdRequestSchema), wrapController(SystemsController.getById));

systemsRouter.post('/', validateRequest(createOneRequestSchema), wrapController(SystemsController.createOne));

systemsRouter.put('/:id', validateRequest(updateOneRequestSchema), wrapController(SystemsController.updateOne));

systemsRouter.delete('/:id', validateRequest(deleteOneRequestSchema), wrapController(SystemsController.deleteOne));
