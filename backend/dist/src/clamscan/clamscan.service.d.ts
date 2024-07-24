import { FileService } from "src/file/file.service";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ClamScanService {
    private fileService;
    private prisma;
    constructor(fileService: FileService, prisma: PrismaService);
    private ClamScan;
    check(shareId: string): Promise<any[]>;
    checkAndRemove(shareId: string): Promise<void>;
}
