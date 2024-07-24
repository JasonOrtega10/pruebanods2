import { PrismaService } from "../../src/prisma/prisma.service";
import { DownLog } from "@prisma/client";
export declare class DownLogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(takenTime: number, ip: string, shareId: string, fileId: string): Promise<DownLog | null>;
}
