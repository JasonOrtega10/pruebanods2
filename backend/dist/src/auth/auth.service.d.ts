import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { ConfigService } from "src/config/config.service";
import { EmailService } from "src/email/email.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/authRegister.dto";
import { AuthSignInDTO } from "./dto/authSignIn.dto";
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    private emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService, emailService: EmailService);
    signUp(dto: AuthRegisterDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signIn(dto: AuthSignInDTO): Promise<{
        loginToken: string;
        accessToken?: undefined;
        refreshToken?: undefined;
    } | {
        accessToken: string;
        refreshToken: string;
        loginToken?: undefined;
    }>;
    requestResetPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    updatePassword(user: User, oldPassword: string, newPassword: string): Promise<{
        refreshTokenId: string;
        refreshToken: string;
    }>;
    createAccessToken(user: User, refreshTokenId: string): Promise<string>;
    signOut(accessToken: string): Promise<void>;
    refreshAccessToken(refreshToken: string): Promise<string>;
    createRefreshToken(userId: string): Promise<{
        refreshTokenId: string;
        refreshToken: string;
    }>;
    createLoginToken(userId: string): Promise<string>;
}
