import { EmailService } from "src/email/email.service";
import { ConfigService } from "./config.service";
import { AdminConfigDTO } from "./dto/adminConfig.dto";
import { ConfigDTO } from "./dto/config.dto";
import { TestEmailDTO } from "./dto/testEmail.dto";
import UpdateConfigDTO from "./dto/updateConfig.dto";
export declare class ConfigController {
    private configService;
    private emailService;
    constructor(configService: ConfigService, emailService: EmailService);
    list(): Promise<ConfigDTO[]>;
    listForAdmin(): Promise<AdminConfigDTO[]>;
    updateMany(data: UpdateConfigDTO[]): Promise<void>;
    finishSetup(): Promise<import(".prisma/client").Config>;
    testEmail({ email }: TestEmailDTO): Promise<void>;
}
