import { Type } from './Type';
export declare class Sign {
    readonly parts: number[];
    constructor(parts: number[]);
    includes(otherSign: Sign): boolean;
    excludes(otherSign: Sign): boolean;
    clone(): Sign;
    addTypes(types: Type[]): void;
}
