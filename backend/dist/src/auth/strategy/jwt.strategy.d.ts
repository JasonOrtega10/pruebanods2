import { User } from "@prisma/client";
import { Strategy } from "passport-jwt";
import { ConfigService } from "src/config/config.service";
import { PrismaService } from "src/prisma/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    private static extractJWT;
    validate(payload: {
        sub: string;
    }): Promise<User>;
}
export {};
