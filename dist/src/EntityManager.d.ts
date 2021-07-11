import { EntityQuery } from './EntityQuery';
import { TypeManager } from './TypeManager';
export declare class EntityManager {
    private _entities;
    private _entitiesPool;
    private _queries;
    private _typeManager;
    private _signManager;
    private _containerManager;
    private _entityExt;
    private _componentsExt;
    private _queryExt;
    constructor(typeManager: TypeManager<any>);
    registerComponent(Constructor: any): void;
    createEntity(...values: any[]): number;
    removeEntity(entityId: number): void;
    setComponents(entityId: number, ...values: any[]): void;
    removeComponents(entityId: number, ...Constructors: any[]): void;
    createQuery(include: any[], exclude: any[]): EntityQuery;
}
