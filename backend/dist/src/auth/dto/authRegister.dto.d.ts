import { UserDTO } from "src/user/dto/user.dto";
declare const AuthRegisterDTO_base: import("@nestjs/common").Type<Pick<UserDTO, "username" | "email" | "password">>;
export declare class AuthRegisterDTO extends AuthRegisterDTO_base {
}
export {};
