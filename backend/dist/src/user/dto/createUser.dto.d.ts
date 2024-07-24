import { UserDTO } from "./user.dto";
export declare class CreateUserDTO extends UserDTO {
    isAdmin: boolean;
    from(partial: Partial<CreateUserDTO>): CreateUserDTO;
}
