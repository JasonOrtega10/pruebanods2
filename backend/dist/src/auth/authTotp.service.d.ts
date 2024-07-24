import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { AuthSignInTotpDTO } from "./dto/authSignInTotp.dto";
export declare class AuthTotpService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    signInTotp(dto: AuthSignInTotpDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    enableTotp(user: User, password: string): Promise<{
        totpAuthUrl: string;
        totpSecret: string;
        qrCode: string;
    }>;
    verifyTotp(user: User, password: string, code: string): Promise<boolean>;
    disableTotp(user: User, password: string, code: string): Promise<boolean>;
}
