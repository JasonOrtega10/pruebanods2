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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ConfigService = class ConfigService {
    constructor(configVariables, prisma) {
        this.configVariables = configVariables;
        this.prisma = prisma;
    }
    get(key) {
        const configVariable = this.configVariables.filter((variable) => variable.key == key)[0];
        if (!configVariable)
            throw new Error(`Config variable ${key} not found`);
        if (configVariable.type == "number")
            return parseInt(configVariable.value);
        if (configVariable.type == "boolean")
            return configVariable.value == "true";
        if (configVariable.type == "string" || configVariable.type == "text")
            return configVariable.value;
    }
    async listForAdmin() {
        return await this.prisma.config.findMany({
            orderBy: { order: "asc" },
            where: { locked: { equals: false } },
        });
    }
    async list() {
        return await this.prisma.config.findMany({
            where: { secret: { equals: false } },
        });
    }
    async updateMany(data) {
        for (const variable of data) {
            await this.update(variable.key, variable.value);
        }
        return data;
    }
    async update(key, value) {
        const configVariable = await this.prisma.config.findUnique({
            where: { key },
        });
        if (!configVariable || configVariable.locked)
            throw new common_1.NotFoundException("Config variable not found");
        if (typeof value != configVariable.type &&
            typeof value == "string" &&
            configVariable.type != "text") {
            throw new common_1.BadRequestException(`Config variable must be of type ${configVariable.type}`);
        }
        const updatedVariable = await this.prisma.config.update({
            where: { key },
            data: { value: value.toString() },
        });
        this.configVariables = await this.prisma.config.findMany();
        return updatedVariable;
    }
    async changeSetupStatus(status) {
        const updatedVariable = await this.prisma.config.update({
            where: { key: "SETUP_STATUS" },
            data: { value: status },
        });
        this.configVariables = await this.prisma.config.findMany();
        return updatedVariable;
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("CONFIG_VARIABLES")),
    __metadata("design:paramtypes", [Array, prisma_service_1.PrismaService])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map