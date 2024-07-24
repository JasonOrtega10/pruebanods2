import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
export declare class UserSevice {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<import(".prisma/client").User[]>;
    get(id: string): Promise<import(".prisma/client").User>;
    create(dto: CreateUserDTO): Promise<import(".prisma/client").User>;
    update(id: string, user: UpdateUserDto): Promise<import(".prisma/client").User>;
    delete(id: string): Promise<import(".prisma/client").User>;
}
