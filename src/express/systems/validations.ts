import { z } from 'zod';
import { zodMongoObjectId } from '../../utils/zod.js';

const requiredFields = z
    .object({
        name: z.string(),
        status: z.boolean(),
    })
    .required();

// GET /api/systems/
export const getAllRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({}),
});

// GET /api/systems/:id
export const getByIdRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});

// POST /api/systems
export const createOneRequestSchema = z.object({
    body: requiredFields,
    query: z.object({}),
    params: z.object({}),
});

// PUT /api/systems/:id
export const updateOneRequestSchema = z.object({
    body: requiredFields,
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});

// DELETE /api/systems/:id
export const deleteOneRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});
