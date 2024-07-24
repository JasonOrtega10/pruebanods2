import { UserDTO } from "./user.dto";
declare const UpdateOwnUserDTO_base: import("@nestjs/common").Type<Partial<Omit<UserDTO, "password" | "isAdmin">>>;
export declare class UpdateOwnUserDTO extends UpdateOwnUserDTO_base {
}
export {};
