import { DocumentNotFoundError } from '../../utils/errors.js';
import { System, SystemDocument } from './interface.js';
import { SystemsModel } from './model.js';

export class SystemsManager {
    static getAll = async (): Promise<SystemDocument[]> => {
        const sys = await SystemsModel.find().lean().exec();
        return sys;
    };

    static getById = async (systemId: string): Promise<SystemDocument> => {
        return SystemsModel.findById(systemId).orFail(new DocumentNotFoundError(systemId)).lean().exec();
    };

    static createOne = async (system: System): Promise<SystemDocument> => {
        const existingSystem = await SystemsModel.findOne({ name: system.name }).lean().exec();

        if (existingSystem) {
            throw new Error('System already exists');
        }
        return SystemsModel.create(system);
    };

    static updateOne = async (systemId: string, update: Partial<System>): Promise<SystemDocument> => {
        return SystemsModel.findByIdAndUpdate(systemId, update, { new: true }).orFail(new DocumentNotFoundError(systemId)).lean().exec();
    };

    static deleteOne = async (systemId: string): Promise<SystemDocument> => {
        return SystemsModel.findByIdAndDelete(systemId).orFail(new DocumentNotFoundError(systemId)).lean().exec();
    };
}
