import { AccessLogDTO } from "./accessLog.dto";
import { DownLogDTO } from "./downLog.dto";
import { ShareDTO } from "./share.dto";
export declare class MyShareDTO extends ShareDTO {
    views: number;
    createdAt: Date;
    recipients: string[];
    accessLogs: AccessLogDTO[];
    downLogs: DownLogDTO[];
    from(partial: Partial<MyShareDTO>): MyShareDTO;
    fromList(partial: Partial<MyShareDTO>[]): MyShareDTO[];
}
