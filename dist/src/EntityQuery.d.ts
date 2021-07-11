import { EntityContainer } from './EntityContainer';
import { Sign } from './Sign';
export declare class EntityQuery {
    readonly includeSign: Sign;
    readonly excludeSign: Sign;
    readonly containers: EntityContainer[];
    constructor(includeSign: Sign, excludeSign: Sign);
    tryAddContainer(container: EntityContainer): boolean;
}
