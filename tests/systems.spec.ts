import { Express } from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { config } from '../src/config.js';

import { Server } from '../src/express/server.js';
import { System } from '../src/express/systems/interface.js';

const { mongo } = config;
const fakeObjectId = new mongoose.Types.ObjectId();

const removeTestSystemCollection = async () => {
    const systemCollection = mongoose.connection.collections['test_system'];
    if (systemCollection) {
        await systemCollection.deleteMany({});
    }
};

const TestSystemSchema = new mongoose.Schema({
    name: String,
    status: Boolean,
});
const TestSystem = mongoose.model('test_system', TestSystemSchema);

const exampleSystem: System = {
    name: "AaAaAa",
    status: true,
};

describe('e2e system API testing', () => {
    let app: Express;
    let createdSystemId: string;

    beforeAll(async () => {
        await mongoose.connect(mongo.uri);
        app = Server.createExpressApp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await removeTestSystemCollection();
    });

    afterAll(async () => {
        await removeTestSystemCollection();
    });

    describe('/isAlive', () => {
        it('should return alive', async () => {
            const response = await request(app).get('/isAlive').expect(200);
            expect(response.text).toBe('alive');
        });
    });

    describe('/unknownRoute', () => {
        it('should return status code 404 for unknown route', async () => {
            await request(app).get('/unknownRoute').expect(404);
        });
    });

    describe('POST /api/systems', () => {
        it('should create a new system', async () => {
            const { body } = await request(app).post('/api/systems').send(exampleSystem).expect(200);
            expect(body).toEqual(expect.objectContaining(exampleSystem));
            createdSystemId = body._id;
        });

        it(' validation should fail for an empty object', async () => {
            await request(app).post('/api/systems').send({}).expect(400);
        });

        it('should fail validation for invalid fields', async () => {
            await request(app).post('/api/systems').send({ name: exampleSystem.name}).expect(400);
        });
    });

    describe('GET /api/systems', () => {
        it('should return 200 with expected system structure', async () => {
            const response = await request(app).get('/api/systems').expect(200);
            console.log("response.body", response.body);
            expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(exampleSystem)]));
        });
    });


    describe('GET /api/systems/:id', () => {
        it('should return 200 with null for a non-existing system', async () => {
            console.log("fakeObjectId", fakeObjectId);
            await request(app).get(`/api/systems/${fakeObjectId}`).expect(404);
        });

        it('should return 200 with the system', async () => {
            const response = await request(app).get(`/api/systems/${createdSystemId}`).expect(200);
            expect(response.body).toEqual(expect.objectContaining(exampleSystem));
        });
    });

    describe('PUT /api/systems/:id', () => {
        it('should return 200 with the updated system', async () => {
            const updatedSystem = { name: "Updated Name", status: false };
            const response = await request(app).put(`/api/systems/${createdSystemId}`).send(updatedSystem).expect(200);
            expect(response.body).toEqual(expect.objectContaining(updatedSystem));
        });

        it('should fail validation for missing fields', async () => {
            await request(app).put(`/api/systems/${createdSystemId}`).send({}).expect(400);
        });

        it('should return 404 for a non-existing system', async () => {
            const updatedSystem = { name: "Updated Name", status: false };
            await request(app).put(`/api/systems/${fakeObjectId}`).send(updatedSystem).expect(404);
        });
    });

    describe('DELETE /api/systems/:id', () => {
        it('should return 200 with the deleted system', async () => {
            await request(app).put(`/api/systems/${createdSystemId}`).send(exampleSystem).expect(200);
            const response = await request(app).delete(`/api/systems/${createdSystemId}`).expect(200);
            expect(response.body).toEqual(expect.objectContaining(exampleSystem));
        });

        it('should return 404 for a non-existing system', async () => {
            await request(app).delete(`/api/systems/${fakeObjectId}`).expect(404);
        });
    });
});
