"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generated@10270 = void 0;
const common_1 = require("@nestjs/common");
 % ;
if (crud && type !== 'graphql-code-first' && type !== 'graphql-schema-first') {
     %  >
    ;
    import { Create } from ;
    singular(classify(name)) %  > Dto;
}
from;
'./dto/create-<%= singular(name) %>.dto';
const module_1 = require();
singular(classify(name)) %  > Dto;
from;
'./dto/update-<%= singular(name) %>.dto';
 % ;
if (crud) {
     %  >
    ;
    import { Create } from ;
    singular(classify(name)) %  > Input;
}
from;
'./dto/create-<%= singular(name) %>.input';
singular(classify(name)) %  > Input;
from;
'./dto/update-<%= singular(name) %>.input';
 % ;
 %  >
;
let default_1 = class {
};
default_1 = __decorate([
    (0, common_1.Injectable)()
], default_1);
(name) %  > Service;
{
     % ;
    if (crud) {
         %  >
            create( % );
        if (type !== 'graphql-code-first' && type !== 'graphql-schema-first') {
             %  > create < ;
            singular(classify(name)) %  > Dto;
            module_2.Create < ;
            singular(classify(name)) %  > Dto <  % ;
        }
        else {
             %  > create < ;
            singular(classify(name)) %  > Input;
            module_2.Create < ;
            singular(classify(name)) %  > Input <  % ;
        }
         %  > ;
        {
            return 'This action adds a new <%= lowercased(singular(classify(name))) %>';
        }
        findAll();
        {
            return `This action returns all <%= lowercased(classify(name)) %>`;
        }
        findOne(id, number);
        {
            return `This action returns a #${id} <%= lowercased(singular(classify(name))) %>`;
        }
        update(id, number,  % );
        if (type !== 'graphql-code-first' && type !== 'graphql-schema-first') {
             %  > update < ;
            singular(classify(name)) %  > Dto;
            module_1.Update < ;
            singular(classify(name)) %  > Dto <  % ;
        }
        else {
             %  > update < ;
            singular(classify(name)) %  > Input;
            module_1.Update < ;
            singular(classify(name)) %  > Input <  % ;
        }
         %  > ;
        {
            return `This action updates a #${id} <%= lowercased(singular(classify(name))) %>`;
        }
        remove(id, number);
        {
            return `This action removes a #${id} <%= lowercased(singular(classify(name))) %>`;
        }
         % ;
    }
     %  > ;
}
//# sourceMappingURL=__name__.service.js.map