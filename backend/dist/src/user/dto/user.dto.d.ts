export declare class UserDTO {
    id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    totpVerified: boolean;
    from(partial: Partial<UserDTO>): UserDTO;
    fromList(partial: Partial<UserDTO>[]): UserDTO[];
}
