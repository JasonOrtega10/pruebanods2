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
exports.UserSevice = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
let UserSevice = class UserSevice {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list() {
        return await this.prisma.user.findMany();
    }
    async get(id) {
        return await this.prisma.user.findUnique({ where: { id } });
    }
    async create(dto) {
        const hash = await argon.hash(dto.password);
        try {
            return await this.prisma.user.create({
                data: Object.assign(Object.assign({}, dto), { password: hash }),
            });
        }
        catch (e) {
            if (e instanceof runtime_1.PrismaClientKnownRequestError) {
                if (e.code == "P2002") {
                    const duplicatedField = e.meta.target[0];
                    throw new common_1.BadRequestException(`A user with this ${duplicatedField} already exists`);
                }
            }
        }
    }
    async update(id, user) {
        try {
            const hash = user.password && (await argon.hash(user.password));
            return await this.prisma.user.update({
                where: { id },
                data: Object.assign(Object.assign({}, user), { password: hash }),
            });
        }
        catch (e) {
            if (e instanceof runtime_1.PrismaClientKnownRequestError) {
                if (e.code == "P2002") {
                    const duplicatedField = e.meta.target[0];
                    throw new common_1.BadRequestException(`A user with this ${duplicatedField} already exists`);
                }
            }
        }
    }
    async delete(id) {
        return await this.prisma.user.delete({ where: { id } });
    }
};
UserSevice = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserSevice);
exports.UserSevice = UserSevice;
//# sourceMappingURL=user.service.js.map