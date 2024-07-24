"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const config_module_1 = require("./config/config.module");
const email_module_1 = require("./email/email.module");
const file_module_1 = require("./file/file.module");
const jobs_module_1 = require("./jobs/jobs.module");
const prisma_module_1 = require("./prisma/prisma.module");
const share_module_1 = require("./share/share.module");
const user_module_1 = require("./user/user.module");
const clamscan_module_1 = require("./clamscan/clamscan.module");
const reverseShare_module_1 = require("./reverseShare/reverseShare.module");
const downlog_module_1 = require("./downlog/downlog.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            share_module_1.ShareModule,
            file_module_1.FileModule,
            email_module_1.EmailModule,
            prisma_module_1.PrismaModule,
            config_module_1.ConfigModule,
            jobs_module_1.JobsModule,
            user_module_1.UserModule,
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 100,
            }),
            schedule_1.ScheduleModule.forRoot(),
            clamscan_module_1.ClamScanModule,
            reverseShare_module_1.ReverseShareModule,
            downlog_module_1.DownLogModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map