export declare class ReverseShareDTO {
    id: string;
    maxShareSize: string;
    shareExpiration: Date;
    from(partial: Partial<ReverseShareDTO>): ReverseShareDTO;
}
