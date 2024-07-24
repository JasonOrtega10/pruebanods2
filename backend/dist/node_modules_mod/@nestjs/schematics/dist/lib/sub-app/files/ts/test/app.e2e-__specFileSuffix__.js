"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
classify(name) %  > Module;
from;
'./../src/<%= name %>.module';
describe('<%= classify(name)%>Controller (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [, classify(name) %  > Module],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
//# sourceMappingURL=app.e2e-__specFileSuffix__.js.map