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
exports.ShareSecurityGuard = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const prisma_service_1 = require("../../prisma/prisma.service");
const share_service_1 = require("../share.service");
let ShareSecurityGuard = class ShareSecurityGuard {
    constructor(shareService, prisma) {
        this.shareService = shareService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const shareId = Object.prototype.hasOwnProperty.call(request.params, "shareId")
            ? request.params.shareId
            : request.params.id;
        const shareToken = request.cookies[`share_${shareId}_token`];
        const share = await this.prisma.share.findUnique({
            where: { id: shareId },
            include: { security: true },
        });
        if (!share ||
            (moment().isAfter(share.expiration) &&
                !moment(share.expiration).isSame(0)))
            throw new common_1.NotFoundException("Share not found");
        if (((_a = share.security) === null || _a === void 0 ? void 0 : _a.password) && !shareToken)
            throw new common_1.ForbiddenException("This share is password protected", "share_password_required");
        if (!(await this.shareService.verifyShareToken(shareId, shareToken)))
            throw new common_1.ForbiddenException("Share token required", "share_token_required");
        return true;
    }
};
ShareSecurityGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [share_service_1.ShareService,
        prisma_service_1.PrismaService])
], ShareSecurityGuard);
exports.ShareSecurityGuard = ShareSecurityGuard;
//# sourceMappingURL=shareSecurity.guard.js.map