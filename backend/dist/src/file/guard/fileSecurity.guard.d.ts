import { ExecutionContext } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ShareSecurityGuard } from "src/share/guard/shareSecurity.guard";
import { ShareService } from "src/share/share.service";
export declare class FileSecurityGuard extends ShareSecurityGuard {
    private _shareService;
    private _prisma;
    constructor(_shareService: ShareService, _prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
