import { Entity } from './Entity';
import { IConstructor } from './IConstructor';
import { Sign } from './Sign';
import { Type } from './Type';
import { TypeManager } from './TypeManager';
export declare class EntityContainer {
    sign: Sign;
    types: Type[];
    typeManager: TypeManager<IConstructor<any>>;
    count: number;
    entities: Entity[];
    components: any[][];
    [component: number]: any[];
    constructor(sign: Sign, types: Type[], typeManager: TypeManager<IConstructor<any>>);
    addEntity(entity: Entity, types: Type[], values: any[]): number;
    removeEntity(entity: Entity): any[];
    getComponent<T>(Constructor: IConstructor<T>): T[];
    private _removeLast;
    private _swapWithLast;
}
