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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const isAdmin_guard_1 = require("../auth/guard/isAdmin.guard");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const email_service_1 = require("../email/email.service");
const config_service_1 = require("./config.service");
const adminConfig_dto_1 = require("./dto/adminConfig.dto");
const config_dto_1 = require("./dto/config.dto");
const testEmail_dto_1 = require("./dto/testEmail.dto");
let ConfigController = class ConfigController {
    constructor(configService, emailService) {
        this.configService = configService;
        this.emailService = emailService;
    }
    async list() {
        return new config_dto_1.ConfigDTO().fromList(await this.configService.list());
    }
    async listForAdmin() {
        return new adminConfig_dto_1.AdminConfigDTO().fromList(await this.configService.listForAdmin());
    }
    async updateMany(data) {
        await this.configService.updateMany(data);
    }
    async finishSetup() {
        return await this.configService.changeSetupStatus("FINISHED");
    }
    async testEmail({ email }) {
        await this.emailService.sendTestMail(email);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, throttler_1.SkipThrottle)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/config.dto").ConfigDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, isAdmin_guard_1.AdministratorGuard),
    openapi.ApiResponse({ status: 200, type: [require("./dto/adminConfig.dto").AdminConfigDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "listForAdmin", null);
__decorate([
    (0, common_1.Patch)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, isAdmin_guard_1.AdministratorGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "updateMany", null);
__decorate([
    (0, common_1.Post)("admin/finishSetup"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, isAdmin_guard_1.AdministratorGuard),
    openapi.ApiResponse({ status: 201, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "finishSetup", null);
__decorate([
    (0, common_1.Post)("admin/testEmail"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, isAdmin_guard_1.AdministratorGuard),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [testEmail_dto_1.TestEmailDTO]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "testEmail", null);
ConfigController = __decorate([
    (0, common_1.Controller)("configs"),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        email_service_1.EmailService])
], ConfigController);
exports.ConfigController = ConfigController;
//# sourceMappingURL=config.controller.js.map