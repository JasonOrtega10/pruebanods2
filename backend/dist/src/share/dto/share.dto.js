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
exports.ShareDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const file_dto_1 = require("../../file/dto/file.dto");
const publicUser_dto_1 = require("../../user/dto/publicUser.dto");
class ShareDTO {
    from(partial) {
        return (0, class_transformer_1.plainToClass)(ShareDTO, partial, { excludeExtraneousValues: true });
    }
    fromList(partial) {
        return partial.map((part) => (0, class_transformer_1.plainToClass)(ShareDTO, part, { excludeExtraneousValues: true }));
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, expiration: { required: true, type: () => Date }, files: { required: true, type: () => [require("../../file/dto/file.dto").FileDTO] }, creator: { required: true, type: () => require("../../user/dto/publicUser.dto").PublicUserDTO }, description: { required: true, type: () => String }, hasPassword: { required: true, type: () => Boolean }, allowDownload: { required: true, type: () => Boolean }, showEstado: { required: true, type: () => Boolean }, referencia: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ShareDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ShareDTO.prototype, "expiration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => file_dto_1.FileDTO),
    __metadata("design:type", Array)
], ShareDTO.prototype, "files", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => publicUser_dto_1.PublicUserDTO),
    __metadata("design:type", publicUser_dto_1.PublicUserDTO)
], ShareDTO.prototype, "creator", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ShareDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ShareDTO.prototype, "hasPassword", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ShareDTO.prototype, "allowDownload", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ShareDTO.prototype, "showEstado", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ShareDTO.prototype, "referencia", void 0);
exports.ShareDTO = ShareDTO;
//# sourceMappingURL=share.dto.js.map