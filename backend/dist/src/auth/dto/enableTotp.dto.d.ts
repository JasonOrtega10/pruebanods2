import { UserDTO } from "src/user/dto/user.dto";
declare const EnableTotpDTO_base: import("@nestjs/common").Type<Pick<UserDTO, "password">>;
export declare class EnableTotpDTO extends EnableTotpDTO_base {
}
export {};
