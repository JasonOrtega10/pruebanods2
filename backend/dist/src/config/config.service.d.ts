import { Config } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ConfigService {
    private configVariables;
    private prisma;
    constructor(configVariables: Config[], prisma: PrismaService);
    get(key: string): any;
    listForAdmin(): Promise<Config[]>;
    list(): Promise<Config[]>;
    updateMany(data: {
        key: string;
        value: string | number | boolean;
    }[]): Promise<{
        key: string;
        value: string | number | boolean;
    }[]>;
    update(key: string, value: string | number | boolean): Promise<Config>;
    changeSetupStatus(status: "STARTED" | "REGISTERED" | "FINISHED"): Promise<Config>;
}
