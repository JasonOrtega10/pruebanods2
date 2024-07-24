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
exports.MyShareDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const accessLog_dto_1 = require("./accessLog.dto");
const downLog_dto_1 = require("./downLog.dto");
const share_dto_1 = require("./share.dto");
class MyShareDTO extends share_dto_1.ShareDTO {
    from(partial) {
        return (0, class_transformer_1.plainToClass)(MyShareDTO, partial, { excludeExtraneousValues: true });
    }
    fromList(partial) {
        return partial.map((part) => (0, class_transformer_1.plainToClass)(MyShareDTO, part, { excludeExtraneousValues: true }));
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { views: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, recipients: { required: true, type: () => [String] }, accessLogs: { required: true, type: () => [require("./accessLog.dto").AccessLogDTO] }, downLogs: { required: true, type: () => [require("./downLog.dto").DownLogDTO] } };
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MyShareDTO.prototype, "views", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], MyShareDTO.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], MyShareDTO.prototype, "recipients", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => accessLog_dto_1.AccessLogDTO),
    __metadata("design:type", Array)
], MyShareDTO.prototype, "accessLogs", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => downLog_dto_1.DownLogDTO),
    __metadata("design:type", Array)
], MyShareDTO.prototype, "downLogs", void 0);
exports.MyShareDTO = MyShareDTO;
//# sourceMappingURL=myShare.dto.js.map