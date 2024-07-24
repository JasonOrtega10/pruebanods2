"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReverseShareDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateReverseShareDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { sendEmailNotification: { required: true, type: () => Boolean }, maxShareSize: { required: true, type: () => String }, shareExpiration: { required: true, type: () => String }, maxUseCount: { required: true, type: () => Number, minimum: 1, maximum: 1000 } };
    }
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReverseShareDTO.prototype, "sendEmailNotification", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReverseShareDTO.prototype, "maxShareSize", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReverseShareDTO.prototype, "shareExpiration", void 0);
__decorate([
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], CreateReverseShareDTO.prototype, "maxUseCount", void 0);
exports.CreateReverseShareDTO = CreateReverseShareDTO;
//# sourceMappingURL=createReverseShare.dto.js.map