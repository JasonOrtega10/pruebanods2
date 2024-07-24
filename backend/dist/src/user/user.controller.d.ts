import { User } from "@prisma/client";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateOwnUserDTO } from "./dto/updateOwnUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserDTO } from "./dto/user.dto";
import { UserSevice } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserSevice);
    getCurrentUser(user: User): Promise<UserDTO>;
    updateCurrentUser(user: User, data: UpdateOwnUserDTO): Promise<UserDTO>;
    deleteCurrentUser(user: User): Promise<UserDTO>;
    list(): Promise<UserDTO[]>;
    create(user: CreateUserDTO): Promise<UserDTO>;
    update(id: string, user: UpdateUserDto): Promise<UserDTO>;
    delete(id: string): Promise<UserDTO>;
}
