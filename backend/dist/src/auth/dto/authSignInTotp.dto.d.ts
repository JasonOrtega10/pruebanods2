import { AuthSignInDTO } from "./authSignIn.dto";
export declare class AuthSignInTotpDTO extends AuthSignInDTO {
    totp: string;
    loginToken: string;
}
