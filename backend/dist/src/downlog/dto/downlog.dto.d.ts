export declare class DownLogDTO {
    id: string;
    takenTime: number;
    ip: string;
    downTime: Date;
    from(partial: Partial<DownLogDTO>): DownLogDTO;
}
