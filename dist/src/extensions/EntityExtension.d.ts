import { ExtensionBase } from './ExtensionBase';
export declare class EntityExtension extends ExtensionBase {
    createEntity(values: any[]): number;
    removeEntity(entityId: number): void;
    private _createOrReuseEntity;
}
