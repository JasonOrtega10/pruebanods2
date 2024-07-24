import { JwtService } from "@nestjs/jwt";
import { Share, User } from "@prisma/client";
import { ClamScanService } from "src/clamscan/clamscan.service";
import { ConfigService } from "src/config/config.service";
import { EmailService } from "src/email/email.service";
import { FileService } from "src/file/file.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ReverseShareService } from "src/reverseShare/reverseShare.service";
import { CreateShareDTO } from "./dto/createShare.dto";
export declare class ShareService {
    private prisma;
    private fileService;
    private emailService;
    private config;
    private jwtService;
    private reverseShareService;
    private clamScanService;
    constructor(prisma: PrismaService, fileService: FileService, emailService: EmailService, config: ConfigService, jwtService: JwtService, reverseShareService: ReverseShareService, clamScanService: ClamScanService);
    create(share: CreateShareDTO, user?: User, reverseShareToken?: string): Promise<Share>;
    createZip(shareId: string): Promise<void>;
    complete(id: string, reverseShareToken?: string): Promise<Share>;
    getSharesByUser(userId: string): Promise<any>;
    get(id: string): Promise<any>;
    getMetaData(id: string): Promise<Share>;
    remove(shareId: string): Promise<void>;
    isShareCompleted(id: string): Promise<boolean>;
    isShareIdAvailable(id: string): Promise<{
        isAvailable: boolean;
    }>;
    increaseViewCount(share: Share): Promise<void>;
    createAccessLog(share: Share, ip: string): Promise<void>;
    getShareToken(shareId: string, password: string, ip: string): Promise<string>;
    generateShareToken(shareId: string): Promise<string>;
    verifyShareToken(shareId: string, token: string): Promise<boolean>;
}
