"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
const openapi = require("@nestjs/swagger");
 % ;
if (isSwaggerInstalled) {
     %  > ;
    import { PartialType } from '@nestjs/swagger';
     % ;
}
else {
     %  > ;
    import { PartialType } from '@nestjs/mapped-types';
     % ;
}
 %  >
;
const module_1 = require();
singular(classify(name)) %  > Dto;
from;
'./create-<%= singular(name) %>.dto';
class Update {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.Update = Update;
(classify(name)) %  > Dto;
(0, swagger_1.PartialType)(module_1.Create < , singular(classify(name)) %  > Dto);
{
     % ;
    if ((type === 'microservice' || type === 'ws') && crud) {
         %  >
            id;
        number;
         % ;
    }
     %  > ;
}
//# sourceMappingURL=update-__name@singular__.dto.js.map