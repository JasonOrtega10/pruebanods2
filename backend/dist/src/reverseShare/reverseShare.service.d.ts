import { ConfigService } from "src/config/config.service";
import { FileService } from "src/file/file.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReverseShareDTO } from "./dto/createReverseShare.dto";
export declare class ReverseShareService {
    private config;
    private prisma;
    private fileService;
    constructor(config: ConfigService, prisma: PrismaService, fileService: FileService);
    create(data: CreateReverseShareDTO, creatorId: string): Promise<string>;
    getByToken(reverseShareToken?: string): Promise<import(".prisma/client").ReverseShare>;
    getAllByUser(userId: string): Promise<(import(".prisma/client").ReverseShare & {
        shares: (import(".prisma/client").Share & {
            creator: import(".prisma/client").User;
        })[];
    })[]>;
    isValid(reverseShareToken: string): Promise<boolean>;
    remove(id: string): Promise<void>;
}
