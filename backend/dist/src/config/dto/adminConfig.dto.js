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
exports.AdminConfigDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const config_dto_1 = require("./config.dto");
class AdminConfigDTO extends config_dto_1.ConfigDTO {
    from(partial) {
        return (0, class_transformer_1.plainToClass)(AdminConfigDTO, partial, {
            excludeExtraneousValues: true,
        });
    }
    fromList(partial) {
        return partial.map((part) => (0, class_transformer_1.plainToClass)(AdminConfigDTO, part, { excludeExtraneousValues: true }));
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { secret: { required: true, type: () => Boolean }, updatedAt: { required: true, type: () => Date }, description: { required: true, type: () => String }, obscured: { required: true, type: () => Boolean }, category: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], AdminConfigDTO.prototype, "secret", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AdminConfigDTO.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminConfigDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], AdminConfigDTO.prototype, "obscured", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AdminConfigDTO.prototype, "category", void 0);
exports.AdminConfigDTO = AdminConfigDTO;
//# sourceMappingURL=adminConfig.dto.js.map