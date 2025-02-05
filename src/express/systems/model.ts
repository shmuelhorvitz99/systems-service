import mongoose from 'mongoose';
import { config } from '../../config.js';
import { SystemDocument } from './interface.js';

const SystemsSchema = new mongoose.Schema<SystemDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
    },
);

export const SystemsModel = mongoose.model<SystemDocument>(config.mongo.systemsCollectionName, SystemsSchema);
