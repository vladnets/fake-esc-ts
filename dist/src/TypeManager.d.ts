import { SignManager } from './SignManager';
import { Type } from './Type';
export declare class TypeManager<T extends object> {
    readonly registry: WeakMap<T, Type>;
    readonly signManager: SignManager;
    nextId: number;
    nextPart: number;
    nextPartIndex: number;
    halfMaxPart: number;
    constructor(signManager: SignManager);
    getType(constructor: T): Type;
    register(constructor: T): Type;
}
