import { EntityContainer } from './EntityContainer';
import { IConstructor } from "./IConstructor";
import { Type } from './Type';
import { SignManager } from './SignManager';
import { Sign } from './Sign';
import { TypeManager } from './TypeManager';
declare type IEntityContainerManagerLevel<T> = {
    [id: number]: T | IEntityContainerManagerLevel<T>;
};
export declare class EntityContainerManager {
    readonly typeManager: TypeManager<IConstructor<any>>;
    readonly signManager: SignManager;
    readonly containers: EntityContainer[];
    readonly containersMap: IEntityContainerManagerLevel<EntityContainer>;
    constructor(typeManager: TypeManager<IConstructor<any>>);
    create(sign: Sign, types: Type[]): EntityContainer;
    addContainer(container: EntityContainer): void;
    getContainer(sign: Sign): undefined | EntityContainer;
    private _init;
}
export {};
