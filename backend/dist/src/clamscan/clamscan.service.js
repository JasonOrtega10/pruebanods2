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
exports.ClamScanService = void 0;
const common_1 = require("@nestjs/common");
const NodeClam = require("clamscan");
const fs = require("fs");
const file_service_1 = require("../file/file.service");
const prisma_service_1 = require("../prisma/prisma.service");
const clamscanConfig = {
    clamdscan: {
        host: process.env.NODE_ENV == "docker" ? "clamav" : "127.0.0.1",
        port: 3310,
        localFallback: false,
    },
    preference: "clamdscan",
};
let ClamScanService = class ClamScanService {
    constructor(fileService, prisma) {
        this.fileService = fileService;
        this.prisma = prisma;
        this.ClamScan = new NodeClam()
            .init(clamscanConfig)
            .then((res) => {
            console.log("ClamAV is active");
            return res;
        })
            .catch(() => {
            console.log("ClamAV is not active");
            return null;
        });
    }
    async check(shareId) {
        const clamScan = await this.ClamScan;
        if (!clamScan)
            return [];
        const infectedFiles = [];
        const files = fs
            .readdirSync(`./data/uploads/shares/${shareId}`)
            .filter((file) => file != "archive.zip");
        for (const fileId of files) {
            const { isInfected } = await clamScan
                .isInfected(`./data/uploads/shares/${shareId}/${fileId}`)
                .catch(() => {
                console.log("ClamAV is not active");
                return { isInfected: false };
            });
            const fileName = (await this.prisma.file.findUnique({ where: { id: fileId } })).name;
            if (isInfected) {
                infectedFiles.push({ id: fileId, name: fileName });
            }
        }
        return infectedFiles;
    }
    async checkAndRemove(shareId) {
        const infectedFiles = await this.check(shareId);
        if (infectedFiles.length > 0) {
            await this.fileService.deleteAllFiles(shareId);
            await this.prisma.file.deleteMany({ where: { shareId } });
            const fileNames = infectedFiles.map((file) => file.name).join(", ");
            await this.prisma.share.update({
                where: { id: shareId },
                data: {
                    removedReason: `Your share got removed because the file(s) ${fileNames} are malicious.`,
                },
            });
            console.log(`Share ${shareId} deleted because it contained ${infectedFiles.length} malicious file(s)`);
        }
    }
};
ClamScanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService,
        prisma_service_1.PrismaService])
], ClamScanService);
exports.ClamScanService = ClamScanService;
//# sourceMappingURL=clamscan.service.js.map