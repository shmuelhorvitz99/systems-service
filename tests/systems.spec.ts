/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Express } from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { config } from '../src/config.js';
import { System } from '../src/express/systems/interface.js';
import { Server } from '../src/express/server.js';

const { mongo } = config;

const fakeObjectId = '111111111111111111111111';

const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection!.deleteMany({});
    }
};

const exampleSystem: System = {
    name: 'test',
    status: true,
};

describe('e2e systems api testing', () => {
    let app: Express;

    beforeAll(async () => {
        await mongoose.connect(mongo.uri);
        app = Server.createExpressApp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await removeAllCollections();
    });

    describe('/isAlive', () => {
        it('should return alive', async () => {
            const response = await request(app).get('/isAlive').expect(200);
            expect(response.text).toBe('alive');
        });
    });

    describe('/unknownRoute', () => {
        it('should return status code 404', async () => {
            return request(app).get('/unknownRoute').expect(404);
        });
    });






    describe('POST /api/systems', () => {
        it('should create a new system', async () => {
            const { body } = await request(app).post('/api/systems').send(exampleSystem).expect(200);

            expect(body).toEqual(expect.objectContaining(exampleSystem));
        });

        it('should fail validation for missing fields', async () => {
            return request(app).post('/api/systems').send({}).expect(400);
        });
    });

    describe('PUT /api/systems/:systemId', () => {
        it('should update system', async () => {

            const {
                body: { _id },
            } = await request(app).post('/api/systems').send(exampleSystem).expect(200);


        });

        it('should fail for updating a non-existing system', async () => {
            return request(app).put(`/api/systems/${fakeObjectId}`).send(exampleSystem).expect(404);
        });
    });

    describe('DELETE /api/systems/:systemId', () => {
        it('should delete system', async () => {
            const {
                body: { _id },
            } = await request(app).post('/api/systems').send(exampleSystem).expect(200);

            return request(app).delete(`/api/systems/${_id}`).expect(200);
        });

        it('should fail for deleting a non-existing system', async () => {
            return request(app).delete(`/api/systems/${fakeObjectId}`).expect(404);
        });
    });
});
