import { ConfigDTO } from "./config.dto";
export declare class AdminConfigDTO extends ConfigDTO {
    secret: boolean;
    updatedAt: Date;
    description: string;
    obscured: boolean;
    category: string;
    from(partial: Partial<AdminConfigDTO>): AdminConfigDTO;
    fromList(partial: Partial<AdminConfigDTO>[]): AdminConfigDTO[];
}
