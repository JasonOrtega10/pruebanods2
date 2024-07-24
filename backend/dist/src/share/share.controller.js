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
exports.ShareController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const getUser_decorator_1 = require("../auth/decorator/getUser.decorator");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const createShare_dto_1 = require("./dto/createShare.dto");
const myShare_dto_1 = require("./dto/myShare.dto");
const share_dto_1 = require("./dto/share.dto");
const shareMetaData_dto_1 = require("./dto/shareMetaData.dto");
const sharePassword_dto_1 = require("./dto/sharePassword.dto");
const createShare_guard_1 = require("./guard/createShare.guard");
const shareOwner_guard_1 = require("./guard/shareOwner.guard");
const shareSecurity_guard_1 = require("./guard/shareSecurity.guard");
const shareTokenSecurity_guard_1 = require("./guard/shareTokenSecurity.guard");
const share_service_1 = require("./share.service");
let ShareController = class ShareController {
    constructor(shareService) {
        this.shareService = shareService;
    }
    async getMyShares(user) {
        return new myShare_dto_1.MyShareDTO().fromList(await this.shareService.getSharesByUser(user.id));
    }
    async get(id) {
        return new share_dto_1.ShareDTO().from(await this.shareService.get(id));
    }
    async getMetaData(id) {
        return new shareMetaData_dto_1.ShareMetaDataDTO().from(await this.shareService.getMetaData(id));
    }
    async create(body, request, user) {
        const { reverse_share_token } = request.cookies;
        return new share_dto_1.ShareDTO().from(await this.shareService.create(body, user, reverse_share_token));
    }
    async remove(id) {
        await this.shareService.remove(id);
    }
    async complete(id, request) {
        const { reverse_share_token } = request.cookies;
        return new share_dto_1.ShareDTO().from(await this.shareService.complete(id, reverse_share_token));
    }
    async isShareIdAvailable(id) {
        return this.shareService.isShareIdAvailable(id);
    }
    async getShareToken(id, ip, response, body) {
        const token = await this.shareService.getShareToken(id, body.password, ip);
        response.cookie(`share_${id}_token`, token, {
            path: "/",
            httpOnly: true,
        });
        return { token };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    openapi.ApiResponse({ status: 200, type: [require("./dto/myShare.dto").MyShareDTO] }),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "getMyShares", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(shareSecurity_guard_1.ShareSecurityGuard),
    openapi.ApiResponse({ status: 200, type: require("./dto/share.dto").ShareDTO }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(":id/metaData"),
    (0, common_1.UseGuards)(shareSecurity_guard_1.ShareSecurityGuard),
    openapi.ApiResponse({ status: 200, type: require("./dto/shareMetaData.dto").ShareMetaDataDTO }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "getMetaData", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(createShare_guard_1.CreateShareGuard),
    openapi.ApiResponse({ status: 201, type: require("./dto/share.dto").ShareDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createShare_dto_1.CreateShareDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, shareOwner_guard_1.ShareOwnerGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/complete"),
    (0, common_1.HttpCode)(202),
    (0, common_1.UseGuards)(createShare_guard_1.CreateShareGuard, shareOwner_guard_1.ShareOwnerGuard),
    openapi.ApiResponse({ status: 202, type: require("./dto/share.dto").ShareDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "complete", null);
__decorate([
    (0, throttler_1.Throttle)(10, 60),
    (0, common_1.Get)("isShareIdAvailable/:id"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "isShareIdAvailable", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, throttler_1.Throttle)(20, 5 * 60),
    (0, common_1.UseGuards)(shareTokenSecurity_guard_1.ShareTokenSecurity),
    (0, common_1.Post)(":id/token"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, sharePassword_dto_1.SharePasswordDto]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "getShareToken", null);
ShareController = __decorate([
    (0, common_1.Controller)("shares"),
    __metadata("design:paramtypes", [share_service_1.ShareService])
], ShareController);
exports.ShareController = ShareController;
//# sourceMappingURL=share.controller.js.map