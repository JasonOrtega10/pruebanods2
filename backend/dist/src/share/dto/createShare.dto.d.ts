import { ShareSecurityDTO } from "./shareSecurity.dto";
export declare class CreateShareDTO {
    id: string;
    recipients: string[];
    expiration: string;
    allowDownload: boolean;
    showEstado: boolean;
    referencia: string;
    description: string;
    security: ShareSecurityDTO;
}
