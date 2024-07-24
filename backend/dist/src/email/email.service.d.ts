import { User } from "@prisma/client";
import * as nodemailer from "nodemailer";
import { ConfigService } from "src/config/config.service";
export declare class EmailService {
    private config;
    constructor(config: ConfigService);
    getTransporter(): nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendMailToShareRecepients(recipientEmail: string, shareId: string, creator?: User): Promise<void>;
    sendMailToReverseShareCreator(recipientEmail: string, shareId: string): Promise<void>;
    sendResetPasswordEmail(recipientEmail: string, token: string): Promise<void>;
    sendTestMail(recipientEmail: string): Promise<void>;
}
