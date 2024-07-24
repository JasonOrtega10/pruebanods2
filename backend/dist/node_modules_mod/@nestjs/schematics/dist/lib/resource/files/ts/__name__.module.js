"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
classify(name) %  > Service;
from;
'./<%= name %>.service';
 % ;
if (type === 'rest' || type === 'microservice') {
     %  > ;
    import {} from ;
    classify(name) %  > Controller;
}
from;
'./<%= name %>.controller';
 % ;
 %  >  % ;
if (type === 'graphql-code-first' || type === 'graphql-schema-first') {
     %  > ;
    import {} from ;
    classify(name) %  > Resolver;
}
from;
'./<%= name %>.resolver';
 % ;
 %  >  % ;
if (type === 'ws') {
     %  > ;
    import {} from ;
    classify(name) %  > Gateway;
}
from;
'./<%= name %>.gateway';
 % ;
 %  >
;
if (type === 'rest' || type === 'microservice') {
     %  > controllers;
    [, classify(name) %  > Controller],
        providers;
    [, classify(name) %  > Service] <  % ;
}
else if (type === 'graphql-code-first' || type === 'graphql-schema-first') {
     %  > providers;
    [, classify(name) %  > Resolver, , classify(name) %  > Service] <  % ;
}
else {
     %  > providers;
    [, classify(name) %  > Gateway, , classify(name) %  > Service] <  % ;
}
 %  >
;
class default_1 {
}
exports.default_1 = default_1;
(name) %  > common_1.Module;
{ }
//# sourceMappingURL=__name__.module.js.map