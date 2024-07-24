import { CanActivate, ExecutionContext } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ShareService } from "src/share/share.service";
export declare class ShareSecurityGuard implements CanActivate {
    private shareService;
    private prisma;
    constructor(shareService: ShareService, prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
