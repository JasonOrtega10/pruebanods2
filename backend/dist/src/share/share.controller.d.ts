import { User } from "@prisma/client";
import { Request, Response } from "express";
import { CreateShareDTO } from "./dto/createShare.dto";
import { MyShareDTO } from "./dto/myShare.dto";
import { ShareDTO } from "./dto/share.dto";
import { ShareMetaDataDTO } from "./dto/shareMetaData.dto";
import { SharePasswordDto } from "./dto/sharePassword.dto";
import { ShareService } from "./share.service";
export declare class ShareController {
    private shareService;
    constructor(shareService: ShareService);
    getMyShares(user: User): Promise<MyShareDTO[]>;
    get(id: string): Promise<ShareDTO>;
    getMetaData(id: string): Promise<ShareMetaDataDTO>;
    create(body: CreateShareDTO, request: Request, user: User): Promise<ShareDTO>;
    remove(id: string): Promise<void>;
    complete(id: string, request: Request): Promise<ShareDTO>;
    isShareIdAvailable(id: string): Promise<{
        isAvailable: boolean;
    }>;
    getShareToken(id: string, ip: string, response: Response, body: SharePasswordDto): Promise<{
        token: string;
    }>;
}
