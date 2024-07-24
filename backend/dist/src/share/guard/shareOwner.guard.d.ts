import { CanActivate, ExecutionContext } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ShareOwnerGuard implements CanActivate {
    private prisma;
    constructor(prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
