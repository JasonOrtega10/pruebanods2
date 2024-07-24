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
exports.ShareService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const archiver = require("archiver");
const argon = require("argon2");
const fs = require("fs");
const moment = require("moment");
const clamscan_service_1 = require("../clamscan/clamscan.service");
const config_service_1 = require("../config/config.service");
const email_service_1 = require("../email/email.service");
const file_service_1 = require("../file/file.service");
const prisma_service_1 = require("../prisma/prisma.service");
const reverseShare_service_1 = require("../reverseShare/reverseShare.service");
let ShareService = class ShareService {
    constructor(prisma, fileService, emailService, config, jwtService, reverseShareService, clamScanService) {
        this.prisma = prisma;
        this.fileService = fileService;
        this.emailService = emailService;
        this.config = config;
        this.jwtService = jwtService;
        this.reverseShareService = reverseShareService;
        this.clamScanService = clamScanService;
    }
    async create(share, user, reverseShareToken) {
        var _a;
        if (!(await this.isShareIdAvailable(share.id)).isAvailable)
            throw new common_1.BadRequestException("Share id already in use");
        if (!share.security || Object.keys(share.security).length == 0)
            share.security = undefined;
        if ((_a = share.security) === null || _a === void 0 ? void 0 : _a.password) {
            share.security.password = await argon.hash(share.security.password);
        }
        let expirationDate;
        const reverseShare = await this.reverseShareService.getByToken(reverseShareToken);
        if (reverseShare) {
            expirationDate = reverseShare.shareExpiration;
        }
        else {
            if (share.expiration !== "never") {
                expirationDate = moment()
                    .add(share.expiration.split("-")[0], share.expiration.split("-")[1])
                    .toDate();
            }
            else {
                expirationDate = moment(0).toDate();
            }
        }
        fs.mkdirSync(`./data/uploads/shares/${share.id}`, {
            recursive: true,
        });
        console.log(share);
        console.log("aqui es 1");
        const shareTuple = await this.prisma.share.create({
            data: Object.assign(Object.assign({}, share), { expiration: expirationDate, creator: { connect: user ? { id: user.id } : undefined }, security: { create: share.security }, allowDownload: share.allowDownload, showEstado: share.showEstado, referencia: share.referencia, recipients: {
                    create: share.recipients
                        ? share.recipients.map((email) => ({ email }))
                        : [],
                } }),
        });
        if (reverseShare) {
            await this.prisma.reverseShare.update({
                where: { token: reverseShareToken },
                data: {
                    shares: {
                        connect: { id: shareTuple.id },
                    },
                },
            });
        }
        return shareTuple;
    }
    async createZip(shareId) {
        const path = `./data/uploads/shares/${shareId}`;
        const files = await this.prisma.file.findMany({ where: { shareId } });
        const archive = archiver("zip", {
            zlib: { level: 9 },
        });
        const writeStream = fs.createWriteStream(`${path}/archive.zip`);
        for (const file of files) {
            archive.append(fs.createReadStream(`${path}/${file.id}`), {
                name: file.name,
            });
        }
        archive.pipe(writeStream);
        await archive.finalize();
    }
    async complete(id, reverseShareToken) {
        const share = await this.prisma.share.findUnique({
            where: { id },
            include: {
                files: true,
                recipients: true,
                creator: true,
                reverseShare: { include: { creator: true } },
            },
        });
        if (await this.isShareCompleted(id))
            throw new common_1.BadRequestException("Share already completed");
        if (share.files.length == 0)
            throw new common_1.BadRequestException("You need at least on file in your share to complete it.");
        if (share.files.length > 1)
            this.createZip(id).then(() => this.prisma.share.update({ where: { id }, data: { isZipReady: true } }));
        for (const recepient of share.recipients) {
            await this.emailService.sendMailToShareRecepients(recepient.email, share.id, share.creator);
        }
        if (share.reverseShare &&
            this.config.get("SMTP_ENABLED") &&
            share.reverseShare.sendEmailNotification) {
            await this.emailService.sendMailToReverseShareCreator(share.reverseShare.creator.email, share.id);
        }
        this.clamScanService.checkAndRemove(share.id);
        if (share.reverseShare) {
            await this.prisma.reverseShare.update({
                where: { token: reverseShareToken },
                data: { remainingUses: { decrement: 1 } },
            });
        }
        return await this.prisma.share.update({
            where: { id },
            data: { uploadLocked: true },
        });
    }
    async getSharesByUser(userId) {
        const shares = await this.prisma.share.findMany({
            where: {
                creator: { id: userId },
                uploadLocked: true,
                OR: [
                    { expiration: { gt: new Date() } },
                    { expiration: { equals: moment(0).toDate() } },
                ],
            },
            orderBy: {
                expiration: "desc",
            },
            include: { recipients: true, accessLogs: true, files: true, downLogs: true },
        });
        const sharesWithEmailRecipientsAndAccessLogs = shares.map((share) => {
            return Object.assign(Object.assign({}, share), { recipients: share.recipients.map((recipients) => recipients.email) });
        });
        return Promise.all(sharesWithEmailRecipientsAndAccessLogs);
    }
    async get(id) {
        var _a;
        const share = await this.prisma.share.findUnique({
            where: { id },
            include: {
                files: true,
                creator: true,
                security: true,
            },
        });
        if (share.removedReason)
            throw new common_1.NotFoundException(share.removedReason, "share_removed");
        if (!share || !share.uploadLocked)
            throw new common_1.NotFoundException("Share not found");
        return Object.assign(Object.assign({}, share), { hasPassword: ((_a = share.security) === null || _a === void 0 ? void 0 : _a.password) ? true : false });
    }
    async getMetaData(id) {
        const share = await this.prisma.share.findUnique({
            where: { id },
        });
        if (!share || !share.uploadLocked)
            throw new common_1.NotFoundException("Share not found");
        return share;
    }
    async remove(shareId) {
        const share = await this.prisma.share.findUnique({
            where: { id: shareId },
        });
        if (!share)
            throw new common_1.NotFoundException("Share not found");
        if (!share.creatorId)
            throw new common_1.ForbiddenException("Anonymous shares can't be deleted");
        await this.fileService.deleteAllFiles(shareId);
        await this.prisma.share.delete({ where: { id: shareId } });
    }
    async isShareCompleted(id) {
        return (await this.prisma.share.findUnique({ where: { id } })).uploadLocked;
    }
    async isShareIdAvailable(id) {
        const share = await this.prisma.share.findUnique({ where: { id } });
        return { isAvailable: !share };
    }
    async increaseViewCount(share) {
        await this.prisma.share.update({
            where: { id: share.id },
            data: { views: share.views + 1 },
        });
    }
    async createAccessLog(share, ip) {
        await this.prisma.accesslog.create({
            data: {
                ip,
                share: {
                    connect: {
                        id: share.id,
                    },
                },
            },
        });
    }
    async getShareToken(shareId, password, ip) {
        var _a, _b;
        const share = await this.prisma.share.findFirst({
            where: { id: shareId },
            include: {
                security: true,
            },
        });
        if (((_a = share === null || share === void 0 ? void 0 : share.security) === null || _a === void 0 ? void 0 : _a.password) &&
            !(await argon.verify(share.security.password, password))) {
            throw new common_1.ForbiddenException("Wrong password");
        }
        if (((_b = share.security) === null || _b === void 0 ? void 0 : _b.maxViews) && share.security.maxViews <= share.views) {
            throw new common_1.ForbiddenException("Maximum views exceeded", "share_max_views_exceeded");
        }
        const token = await this.generateShareToken(shareId);
        await this.increaseViewCount(share);
        await this.createAccessLog(share, ip);
        return token;
    }
    async generateShareToken(shareId) {
        const { expiration } = await this.prisma.share.findUnique({
            where: { id: shareId },
        });
        return this.jwtService.sign({
            shareId,
        }, {
            expiresIn: moment(expiration).diff(new Date(), "seconds") + "s",
            secret: this.config.get("JWT_SECRET"),
        });
    }
    async verifyShareToken(shareId, token) {
        const { expiration } = await this.prisma.share.findUnique({
            where: { id: shareId },
        });
        try {
            const claims = this.jwtService.verify(token, {
                secret: this.config.get("JWT_SECRET"),
                ignoreExpiration: moment(expiration).isSame(0),
            });
            return claims.shareId == shareId;
        }
        catch (_a) {
            return false;
        }
    }
};
ShareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_service_1.FileService,
        email_service_1.EmailService,
        config_service_1.ConfigService,
        jwt_1.JwtService,
        reverseShare_service_1.ReverseShareService,
        clamscan_service_1.ClamScanService])
], ShareService);
exports.ShareService = ShareService;
//# sourceMappingURL=share.service.js.map