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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const runtime_1 = require("@prisma/client/runtime");
const argon = require("argon2");
const moment = require("moment");
const config_service_1 = require("../config/config.service");
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, config, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.emailService = emailService;
    }
    async signUp(dto) {
        const isFirstUser = this.config.get("SETUP_STATUS") == "STARTED";
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    password: hash,
                    isAdmin: isFirstUser,
                },
            });
            if (isFirstUser) {
                await this.config.changeSetupStatus("REGISTERED");
            }
            const { refreshToken, refreshTokenId } = await this.createRefreshToken(user.id);
            const accessToken = await this.createAccessToken(user, refreshTokenId);
            return { accessToken, refreshToken };
        }
        catch (e) {
            if (e instanceof runtime_1.PrismaClientKnownRequestError) {
                if (e.code == "P2002") {
                    const duplicatedField = e.meta.target[0];
                    throw new common_1.BadRequestException(`A user with this ${duplicatedField} already exists`);
                }
            }
        }
    }
    async signIn(dto) {
        if (!dto.email && !dto.username)
            throw new common_1.BadRequestException("Email or username is required");
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: dto.email }, { username: dto.username }],
            },
        });
        if (!user || !(await argon.verify(user.password, dto.password)))
            throw new common_1.UnauthorizedException("Wrong email or password");
        if (user.totpVerified) {
            const loginToken = await this.createLoginToken(user.id);
            return { loginToken };
        }
        const { refreshToken, refreshTokenId } = await this.createRefreshToken(user.id);
        const accessToken = await this.createAccessToken(user, refreshTokenId);
        return { accessToken, refreshToken };
    }
    async requestResetPassword(email) {
        const user = await this.prisma.user.findFirst({
            where: { email },
            include: { resetPasswordToken: true },
        });
        if (!user)
            throw new common_1.BadRequestException("User not found");
        if (user.resetPasswordToken) {
            await this.prisma.resetPasswordToken.delete({
                where: { token: user.resetPasswordToken.token },
            });
        }
        const { token } = await this.prisma.resetPasswordToken.create({
            data: {
                expiresAt: moment().add(1, "hour").toDate(),
                user: { connect: { id: user.id } },
            },
        });
        await this.emailService.sendResetPasswordEmail(user.email, token);
    }
    async resetPassword(token, newPassword) {
        const user = await this.prisma.user.findFirst({
            where: { resetPasswordToken: { token } },
        });
        if (!user)
            throw new common_1.BadRequestException("Token invalid or expired");
        const newPasswordHash = await argon.hash(newPassword);
        await this.prisma.resetPasswordToken.delete({
            where: { token },
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: newPasswordHash },
        });
    }
    async updatePassword(user, oldPassword, newPassword) {
        if (!(await argon.verify(user.password, oldPassword)))
            throw new common_1.ForbiddenException("Invalid password");
        const hash = await argon.hash(newPassword);
        await this.prisma.refreshToken.deleteMany({
            where: { userId: user.id },
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hash },
        });
        return this.createRefreshToken(user.id);
    }
    async createAccessToken(user, refreshTokenId) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            refreshTokenId,
        }, {
            expiresIn: "15min",
            secret: this.config.get("JWT_SECRET"),
        });
    }
    async signOut(accessToken) {
        const { refreshTokenId } = this.jwtService.decode(accessToken) || {};
        if (refreshTokenId) {
            await this.prisma.refreshToken
                .delete({ where: { id: refreshTokenId } })
                .catch((e) => {
                if (e.code != "P2025")
                    throw e;
            });
        }
    }
    async refreshAccessToken(refreshToken) {
        const refreshTokenMetaData = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });
        if (!refreshTokenMetaData || refreshTokenMetaData.expiresAt < new Date())
            throw new common_1.UnauthorizedException();
        return this.createAccessToken(refreshTokenMetaData.user, refreshTokenMetaData.id);
    }
    async createRefreshToken(userId) {
        const { id, token } = await this.prisma.refreshToken.create({
            data: { userId, expiresAt: moment().add(3, "months").toDate() },
        });
        return { refreshTokenId: id, refreshToken: token };
    }
    async createLoginToken(userId) {
        const loginToken = (await this.prisma.loginToken.create({
            data: { userId, expiresAt: moment().add(5, "minutes").toDate() },
        })).token;
        return loginToken;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_service_1.ConfigService,
        email_service_1.EmailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map