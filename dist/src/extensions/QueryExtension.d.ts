import { ExtensionBase } from './ExtensionBase';
import { EntityQuery } from '../EntityQuery';
export declare class QueryExtension extends ExtensionBase {
    createQuery(include: any[], exclude: any[]): EntityQuery;
}
