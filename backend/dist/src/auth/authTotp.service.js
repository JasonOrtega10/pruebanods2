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
exports.AuthTotpService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const otplib_1 = require("otplib");
const qrcode = require("qrcode-svg");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_service_1 = require("./auth.service");
let AuthTotpService = class AuthTotpService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async signInTotp(dto) {
        if (!dto.email && !dto.username)
            throw new common_1.BadRequestException("Email or username is required");
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: dto.email }, { username: dto.username }],
            },
        });
        if (!user || !(await argon.verify(user.password, dto.password)))
            throw new common_1.UnauthorizedException("Wrong email or password");
        const token = await this.prisma.loginToken.findFirst({
            where: {
                token: dto.loginToken,
            },
        });
        if (!token || token.userId != user.id || token.used)
            throw new common_1.UnauthorizedException("Invalid login token");
        if (token.expiresAt < new Date())
            throw new common_1.UnauthorizedException("Login token expired");
        const { totpSecret } = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: { totpSecret: true },
        });
        if (!totpSecret) {
            throw new common_1.BadRequestException("TOTP is not enabled");
        }
        const expected = otplib_1.authenticator.generate(totpSecret);
        if (dto.totp !== expected) {
            throw new common_1.BadRequestException("Invalid code");
        }
        await this.prisma.loginToken.update({
            where: { token: token.token },
            data: { used: true },
        });
        const { refreshToken, refreshTokenId } = await this.authService.createRefreshToken(user.id);
        const accessToken = await this.authService.createAccessToken(user, refreshTokenId);
        return { accessToken, refreshToken };
    }
    async enableTotp(user, password) {
        if (!(await argon.verify(user.password, password)))
            throw new common_1.ForbiddenException("Invalid password");
        const { totpVerified } = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: { totpVerified: true },
        });
        if (totpVerified) {
            throw new common_1.BadRequestException("TOTP is already enabled");
        }
        const secret = otplib_1.authenticator.generateSecret();
        const otpURL = otplib_1.totp.keyuri(user.username || user.email, "pingvin-share", secret);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                totpEnabled: true,
                totpSecret: secret,
            },
        });
        const qrCode = new qrcode({
            content: otpURL,
            container: "svg-viewbox",
            join: true,
        }).svg();
        return {
            totpAuthUrl: otpURL,
            totpSecret: secret,
            qrCode: "data:image/svg+xml;base64," + Buffer.from(qrCode).toString("base64"),
        };
    }
    async verifyTotp(user, password, code) {
        if (!(await argon.verify(user.password, password)))
            throw new common_1.ForbiddenException("Invalid password");
        const { totpSecret } = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: { totpSecret: true },
        });
        if (!totpSecret) {
            throw new common_1.BadRequestException("TOTP is not in progress");
        }
        const expected = otplib_1.authenticator.generate(totpSecret);
        if (code !== expected) {
            throw new common_1.BadRequestException("Invalid code");
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                totpVerified: true,
            },
        });
        return true;
    }
    async disableTotp(user, password, code) {
        if (!(await argon.verify(user.password, password)))
            throw new common_1.ForbiddenException("Invalid password");
        const { totpSecret } = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: { totpSecret: true },
        });
        if (!totpSecret) {
            throw new common_1.BadRequestException("TOTP is not enabled");
        }
        const expected = otplib_1.authenticator.generate(totpSecret);
        if (code !== expected) {
            throw new common_1.BadRequestException("Invalid code");
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                totpVerified: false,
                totpEnabled: false,
                totpSecret: null,
            },
        });
        return true;
    }
};
AuthTotpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], AuthTotpService);
exports.AuthTotpService = AuthTotpService;
//# sourceMappingURL=authTotp.service.js.map