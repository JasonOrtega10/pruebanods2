var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
 % ;
if (type === 'graphql-code-first') {
     %  > ;
    import { InputType, Int, Field } from '@nestjs/graphql';
    let Create = class Create {
    };
    Create = __decorate([
        (0, graphql_1.InputType)()
    ], Create);
    export { Create };
    (classify(name)) %  > Input;
    {
        exampleField: number;
    }
     % ;
}
else {
     %  > ;
    export class Create {
    }
    (classify(name)) %  > Input;
    { }
     % ;
}
 %  >
;
//# sourceMappingURL=create-__name@singular__.input.js.map