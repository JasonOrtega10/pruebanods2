/// <reference types="node" />
import { JwtService } from "@nestjs/jwt";
import * as fs from "fs";
import { ConfigService } from "src/config/config.service";
import { PrismaService } from "src/prisma/prisma.service";
export declare class FileService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    create(data: string, chunk: {
        index: number;
        total: number;
    }, file: {
        id?: string;
        name: string;
    }, shareId: string): Promise<{
        id?: string;
        name: string;
    }>;
    get(shareId: string, fileId: string): Promise<{
        metaData: {
            size: string;
            id: string;
            createdAt: Date;
            name: string;
            status: string;
            shareId: string;
            mimeType: string | false;
        };
        file: fs.ReadStream;
    }>;
    deleteAllFiles(shareId: string): Promise<void>;
    getZip(shareId: string): fs.ReadStream;
    setStatus(fileId: string, status: string): Promise<void>;
}
