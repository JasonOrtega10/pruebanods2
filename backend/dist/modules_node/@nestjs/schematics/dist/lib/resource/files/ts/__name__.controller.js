"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openapi = require("@nestjs/swagger");
 % ;
if (crud && type === 'rest') {
     %  > ;
    import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
     %
    ;
}
else if (crud && type === 'microservice') {
     %  > ;
    import { Controller } from '@nestjs/common';
    import { MessagePattern, Payload } from '@nestjs/microservices';
     %
    ;
}
else {
     %  > ;
    import { Controller } from '@nestjs/common';
     %
    ;
}
 %  >
;
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
const module_1 = require();
singular(classify(name)) %  > Dto;
from;
'./dto/update-<%= singular(name) %>.dto';
 % ;
 %  >
     % ;
if (type === 'rest') {
     %  > ;
     % ;
}
else {
     %  > ;
     % ;
}
 %  >
;
class default_1 {
}
exports.default_1 = default_1;
(name) %  > common_1.Controller;
{
    constructor(private, readonly < , lowercased(name) %  > Service, , classify(name) %  > Service);
    { }
     % ;
    if (type === 'rest' && crud) {
         %  >
        ;
        create();
        create < ;
        singular(classify(name)) %  > Dto;
        module_2.Create < ;
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
        id: string;
        {
            return this. < ;
            lowercased(name) %  > Service.findOne(+id);
        }
        update();
        id: string, ;
        update < ;
        singular(classify(name)) %  > Dto;
        module_1.Update < ;
        singular(classify(name)) %  > Dto;
        {
            return this. < ;
            lowercased(name) %  > Service.update(+id, update < , singular(classify(name)) %  > Dto);
        }
        remove();
        id: string;
        {
            return this. < ;
            lowercased(name) %  > Service.remove(+id);
        }
         % ;
    }
    else if (type === 'microservice' && crud) {
         %  >
        ;
        create();
        create < ;
        singular(classify(name)) %  > Dto;
        module_2.Create < ;
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
        module_1.Update < ;
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
//# sourceMappingURL=__name__.controller.js.map