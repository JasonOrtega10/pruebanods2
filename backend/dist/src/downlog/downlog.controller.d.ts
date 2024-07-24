import { DownLogService } from "./downlog.service";
export declare class DownLogController {
    private downLogService;
    constructor(downLogService: DownLogService);
    createLog(shareId: string, body: {
        ip: string;
        takenTime: number;
        fileId: string;
    }): Promise<import(".prisma/client").DownLog>;
}
