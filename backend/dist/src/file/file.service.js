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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto = require("crypto");
const fs = require("fs");
const mime = require("mime-types");
const config_service_1 = require("../config/config.service");
const prisma_service_1 = require("../prisma/prisma.service");
let FileService = class FileService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
    }
    async create(data, chunk, file, shareId) {
        var _a;
        if (!file.id)
            file.id = crypto.randomUUID();
        const share = await this.prisma.share.findUnique({
            where: { id: shareId },
            include: { files: true, reverseShare: true },
        });
        if (share.uploadLocked)
            throw new common_1.BadRequestException("Share is already completed");
        let diskFileSize;
        try {
            diskFileSize = fs.statSync(`./data/uploads/shares/${shareId}/${file.id}.tmp-chunk`).size;
        }
        catch (_b) {
            diskFileSize = 0;
        }
        const chunkSize = 10 * 1024 * 1024;
        const expectedChunkIndex = Math.ceil(diskFileSize / chunkSize);
        if (expectedChunkIndex != chunk.index)
            throw new common_1.BadRequestException({
                message: "Unexpected chunk received",
                error: "unexpected_chunk_index",
                expectedChunkIndex,
            });
        const buffer = Buffer.from(data, "base64");
        const fileSizeSum = share.files.reduce((n, { size }) => n + parseInt(size), 0);
        const shareSizeSum = fileSizeSum + diskFileSize + buffer.byteLength;
        if (shareSizeSum > this.config.get("MAX_SHARE_SIZE") ||
            (((_a = share.reverseShare) === null || _a === void 0 ? void 0 : _a.maxShareSize) &&
                shareSizeSum > parseInt(share.reverseShare.maxShareSize))) {
            throw new common_1.HttpException("Max share size exceeded", common_1.HttpStatus.PAYLOAD_TOO_LARGE);
        }
        fs.appendFileSync(`./data/uploads/shares/${shareId}/${file.id}.tmp-chunk`, buffer);
        const isLastChunk = chunk.index == chunk.total - 1;
        if (isLastChunk) {
            fs.renameSync(`./data/uploads/shares/${shareId}/${file.id}.tmp-chunk`, `./data/uploads/shares/${shareId}/${file.id}`);
            const fileSize = fs.statSync(`./data/uploads/shares/${shareId}/${file.id}`).size;
            await this.prisma.file.create({
                data: {
                    id: file.id,
                    name: file.name,
                    size: fileSize.toString(),
                    share: { connect: { id: shareId } },
                },
            });
        }
        return file;
    }
    async get(shareId, fileId) {
        const fileMetaData = await this.prisma.file.findUnique({
            where: { id: fileId },
        });
        if (!fileMetaData)
            throw new common_1.NotFoundException("File not found");
        const file = fs.createReadStream(`./data/uploads/shares/${shareId}/${fileId}`);
        return {
            metaData: Object.assign(Object.assign({ mimeType: mime.contentType(fileMetaData.name.split(".").pop()) }, fileMetaData), { size: fileMetaData.size }),
            file,
        };
    }
    async deleteAllFiles(shareId) {
        await fs.promises.rm(`./data/uploads/shares/${shareId}`, {
            recursive: true,
            force: true,
        });
    }
    getZip(shareId) {
        return fs.createReadStream(`./data/uploads/shares/${shareId}/archive.zip`);
    }
    async setStatus(fileId, status) {
        await this.prisma.file.update({
            where: {
                id: fileId,
            },
            data: {
                status,
            },
        });
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_service_1.ConfigService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map