import { StreamableFile } from "@nestjs/common";
import { Response } from "express";
import { FileService } from "./file.service";
import { DownLogService } from "src/downlog/downlog.service";
export declare class FileController {
    private fileService;
    private downLogService;
    constructor(fileService: FileService, downLogService: DownLogService);
    create(query: any, body: string, shareId: string): Promise<{
        id?: string;
        name: string;
    }>;
    getZip(res: Response, shareId: string): Promise<StreamableFile>;
    getFile(res: Response, shareId: string, fileId: string, download?: string): Promise<StreamableFile>;
    updateFile(fileId: string, status: string): Promise<{
        message: string;
    }>;
}
