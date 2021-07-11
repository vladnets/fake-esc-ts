import { EntityContainer } from './EntityContainer';
export declare class Entity {
    readonly id: number;
    container: EntityContainer;
    index: number;
    constructor(id: number, container?: EntityContainer, index?: number);
}
