import { Response } from 'express';
import { TypedRequest } from '../../utils/zod.js';
import { SystemsManager } from './manager.js';
import { createOneRequestSchema, deleteOneRequestSchema, getAllRequestSchema, getByIdRequestSchema, updateOneRequestSchema } from './validations.js';

export class SystemsController {
    static getAll = async (_req: TypedRequest<typeof getAllRequestSchema>, res: Response) => {
        res.json(await SystemsManager.getAll());
    };

    static getById = async (req: TypedRequest<typeof getByIdRequestSchema>, res: Response) => {
        res.json(await SystemsManager.getById(req.params.id));
    };

    static createOne = async (req: TypedRequest<typeof createOneRequestSchema>, res: Response) => {
        res.json(await SystemsManager.createOne(req.body));
    };

    static updateOne = async (req: TypedRequest<typeof updateOneRequestSchema>, res: Response) => {
        res.json(await SystemsManager.updateOne(req.params.id, req.body));
    };

    static deleteOne = async (req: TypedRequest<typeof deleteOneRequestSchema>, res: Response) => {
        res.json(await SystemsManager.deleteOne(req.params.id));
    };
}
