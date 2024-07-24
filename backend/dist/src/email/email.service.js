"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_service_1 = require("../config/config.service");
let EmailService = class EmailService {
    constructor(config) {
        this.config = config;
    }
    getTransporter() {
        if (!this.config.get("SMTP_ENABLED"))
            throw new common_1.InternalServerErrorException("SMTP is disabled");
        return nodemailer.createTransport({
            host: this.config.get("SMTP_HOST"),
            port: parseInt(this.config.get("SMTP_PORT")),
            secure: parseInt(this.config.get("SMTP_PORT")) == 465,
            auth: {
                user: this.config.get("SMTP_USERNAME"),
                pass: this.config.get("SMTP_PASSWORD"),
            },
        });
    }
    async sendMailToShareRecepients(recipientEmail, shareId, creator) {
        var _a;
        if (!this.config.get("ENABLE_SHARE_EMAIL_RECIPIENTS"))
            throw new common_1.InternalServerErrorException("Email service disabled");
        const shareUrl = `${this.config.get("APP_URL")}/share/${shareId}`;
        await this.getTransporter().sendMail({
            from: `"Nodeny.me" <${this.config.get("SMTP_EMAIL")}>`,
            to: recipientEmail,
            replyTo: creator.email,
            cc: creator.email,
            subject: this.config.get("SHARE_RECEPIENTS_EMAIL_SUBJECT"),
            text: this.config
                .get("SHARE_RECEPIENTS_EMAIL_MESSAGE")
                .replaceAll("\\n", "\n")
                .replaceAll("{creator}", (_a = creator === null || creator === void 0 ? void 0 : creator.username) !== null && _a !== void 0 ? _a : "Someone")
                .replaceAll("{shareUrl}", shareUrl),
        });
    }
    async sendMailToReverseShareCreator(recipientEmail, shareId) {
        const shareUrl = `${this.config.get("APP_URL")}/share/${shareId}`;
        await this.getTransporter().sendMail({
            from: `"Pingvin Share" <${this.config.get("SMTP_EMAIL")}>`,
            to: recipientEmail,
            subject: this.config.get("REVERSE_SHARE_EMAIL_SUBJECT"),
            text: this.config
                .get("REVERSE_SHARE_EMAIL_MESSAGE")
                .replaceAll("\\n", "\n")
                .replaceAll("{shareUrl}", shareUrl),
        });
    }
    async sendResetPasswordEmail(recipientEmail, token) {
        const resetPasswordUrl = `${this.config.get("APP_URL")}/auth/resetPassword/${token}`;
        await this.getTransporter().sendMail({
            from: `"Nodeny.me" <${this.config.get("SMTP_EMAIL")}>`,
            to: recipientEmail,
            subject: this.config.get("RESET_PASSWORD_EMAIL_SUBJECT"),
            text: this.config
                .get("RESET_PASSWORD_EMAIL_MESSAGE")
                .replaceAll("{url}", resetPasswordUrl),
        });
    }
    async sendTestMail(recipientEmail) {
        try {
            await this.getTransporter().sendMail({
                from: `"Nodeny.me" <${this.config.get("SMTP_EMAIL")}>`,
                to: recipientEmail,
                subject: "Test email",
                text: "This is a test email",
            });
        }
        catch (e) {
            console.error(e);
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map