export declare let get: (strarr: SetArray, key: string) => number | undefined;
export declare let put: (strarr: SetArray, key: string) => number;
export declare let pop: (strarr: SetArray) => void;
export declare class SetArray {
    private _indexes;
    array: readonly string[];
    constructor();
}
