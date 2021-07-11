import { Type } from './Type';
import { Sign } from './Sign';
export declare class SignManager {
    readonly signPartsCount: number;
    constructor(signPartsCount: number);
    createEmpty(): Sign;
    createFromTypes(types: Type[]): Sign;
}
