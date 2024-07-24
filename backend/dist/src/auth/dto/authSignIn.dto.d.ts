import { UserDTO } from "src/user/dto/user.dto";
declare const AuthSignInDTO_base: import("@nestjs/common").Type<Pick<UserDTO, "password">>;
export declare class AuthSignInDTO extends AuthSignInDTO_base {
    email: string;
    username: string;
}
export {};
