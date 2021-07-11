import { Entity } from '../Entity';
import { EntityContainerManager } from '../EntityContainerManager';
import { EntityQuery } from '../EntityQuery';
import { Sign } from '../Sign';
import { SignManager } from '../SignManager';
import { Type } from '../Type';
import { TypeManager } from '../TypeManager';
export interface IExtensionContext {
    entities: Entity[];
    entitiesPool: Entity[];
    queries: EntityQuery[];
    typeManager: TypeManager<any>;
    signManager: SignManager;
    containerManager: EntityContainerManager;
}
export declare abstract class ExtensionBase {
    entities: Entity[];
    entitiesPool: Entity[];
    queries: EntityQuery[];
    typeManager: TypeManager<any>;
    signManager: SignManager;
    containerManager: EntityContainerManager;
    constructor(context: IExtensionContext);
    protected _findOrCreateContainer(sign: Sign, types: Type[]): import("..").EntityContainer;
    protected _createContainer(sign: Sign, types: Type[]): import("..").EntityContainer;
    protected _getTypesFromValues(values: any[]): Type[];
    protected _getTypesFromConstructors(Constructors: any[]): Type[];
}
