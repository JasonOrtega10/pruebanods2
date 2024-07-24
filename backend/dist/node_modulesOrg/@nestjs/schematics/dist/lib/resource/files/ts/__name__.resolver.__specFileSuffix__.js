"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
classify(name) %  > Resolver;
from;
'./<%= name %>.resolver';
classify(name) %  > Service;
from;
'./<%= name %>.service';
describe('<%= classify(name) %>Resolver', () => {
    let resolver;
     %  > Resolver;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [, classify(name) %  > Resolver, , classify(name) %  > Service],
        }).compile();
        resolver = module.get << ;
        classify(name) %  > Resolver > ;
        classify(name) %  > Resolver;
    });
});
it('should be defined', () => {
    expect(resolver).toBeDefined();
});
;
//# sourceMappingURL=__name__.resolver.__specFileSuffix__.js.map