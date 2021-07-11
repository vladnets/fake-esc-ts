import { ExtensionBase } from './ExtensionBase';
export declare class ComponentsExtension extends ExtensionBase {
    setComponents(entityId: number, values: any[]): void;
    removeComponents(entityId: number, Constructors: any[]): void;
}
