import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('E2E Test', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .compile()
        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET cats`, () => {
        return request.default(app.getHttpServer())
            .post('/users')
            .expect(400)
        // .expect({
        //     // data: catsService.findAll(),
        // });
    });
    // request.default()
    afterAll(async () => {
        await app.close();
    });
});
// hello