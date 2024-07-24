"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generated@9477 = void 0;
const module_1 = require();
if (crud) {
     %  > , SubscribeMessage, MessageBody <  % ;
}
 %  > ;
from;
'@nestjs/websockets';
classify(name) %  > Service;
from;
'./<%= name %>.service';
 % ;
if (crud) {
     %  >
    ;
    import { Create } from ;
    singular(classify(name)) %  > Dto;
}
from;
'./dto/create-<%= singular(name) %>.dto';
const module_2 = require();
singular(classify(name)) %  > Dto;
from;
'./dto/update-<%= singular(name) %>.dto';
 % ;
 %  >
;
let default_1 = class {
};
default_1 = __decorate([
    (0, module_1.WebSocketGateway)()
], default_1);
(name) %  > Gateway;
{
    constructor(private, readonly < , lowercased(name) %  > Service, , classify(name) %  > Service);
    { }
     % ;
    if (crud) {
         %  >
        ;
        create();
        create < ;
        singular(classify(name)) %  > Dto;
        module_3.Create < ;
        singular(classify(name)) %  > Dto;
        {
            return this. < ;
            lowercased(name) %  > Service.create(create < , singular(classify(name)) %  > Dto);
        }
        findAll();
        {
            return this. < ;
            lowercased(name) %  > Service.findAll();
        }
        findOne();
        id: number;
        {
            return this. < ;
            lowercased(name) %  > Service.findOne(id);
        }
        update();
        update < ;
        singular(classify(name)) %  > Dto;
        module_2.Update < ;
        singular(classify(name)) %  > Dto;
        {
            return this. < ;
            lowercased(name) %  > Service.update(update < , singular(classify(name)) %  > Dto.id, update < , singular(classify(name)) %  > Dto);
        }
        remove();
        id: number;
        {
            return this. < ;
            lowercased(name) %  > Service.remove(id);
        }
         % ;
    }
     %  >
    ;
}
//# sourceMappingURL=__name__.gateway.js.map