"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
singular(classify(name)) %  > Input;
from;
'./create-<%= singular(name) %>.input';
 % ;
if (type === 'graphql-code-first') {
     %  >
    ;
    import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
    let Update = class Update {
    };
    Update = __decorate([
        (0, graphql_1.InputType)()
    ], Update);
    export { Update };
    (classify(name)) %  > Input;
    (0, graphql_1.PartialType)(module_1.Create < , singular(classify(name)) %  > Input);
    {
        id: number;
    }
     % ;
}
else {
     %  >
    ;
    import { PartialType } from '@nestjs/mapped-types';
    export class Update {
    }
    (classify(name)) %  > Input;
    (0, graphql_1.PartialType)(module_1.Create < , singular(classify(name)) %  > Input);
    {
        id: number;
    }
     % ;
}
 %  >
;
//# sourceMappingURL=update-__name@singular__.input.js.map