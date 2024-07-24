export declare function argsArgArrayOrObject<T, O extends Record<string, T>>(args: T[] | [O] | [T[]]): {
    args: T[];
    keys: string[] | null;
};
