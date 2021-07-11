import { EntityQuery } from './EntityQuery';
import { SignManager } from './SignManager';
import { EntityContainerManager } from './EntityContainerManager';
import { TypeManager } from './TypeManager';
import { Entity } from './Entity';
import { EntityExtension } from './extensions/EntityExtension';
import { IExtensionContext } from './extensions/ExtensionBase';
import { ComponentsExtension } from './extensions/ComponentsExtension';
import { Type } from './Type';
import { QueryExtension } from './extensions/QueryExtension';

export class EntityManager {
  private _entities: Entity[];
  private _entitiesPool: Entity[];

  private _queries: EntityQuery[];

  private _typeManager: TypeManager<any>;
  private _signManager: SignManager;
  private _containerManager: EntityContainerManager;

  private _entityExt: EntityExtension;
  private _componentsExt: ComponentsExtension;
  private _queryExt: QueryExtension;

  constructor(typeManager: TypeManager<any>) {
    this._entities = [];
    this._entitiesPool = [];
    this._queries = [];
    this._typeManager = typeManager;
    this._signManager = typeManager.signManager;
    this._containerManager = new EntityContainerManager(this._typeManager);

    const context: IExtensionContext = {
      entities: this._entities,
      entitiesPool: this._entitiesPool,
      queries: this._queries,
      typeManager: this._typeManager,
      signManager: this._signManager,
      containerManager: this._containerManager
    };

    this._entityExt = new EntityExtension(context);
    this._componentsExt = new ComponentsExtension(context);
    this._queryExt = new QueryExtension(context);
  }

  registerComponent(Constructor: any) {
    this._typeManager.register(Constructor);
  }

  createEntity(...values: any[]): number {
    return this._entityExt.createEntity(values);
  }

  removeEntity(entityId: number) {
    this._entityExt.removeEntity(entityId);
  }

  setComponents(entityId: number, ...values: any[]) {
    this._componentsExt.setComponents(entityId, values);
  }

  removeComponents(entityId: number, ...Constructors: any[]) {
    this._componentsExt.removeComponents(entityId, Constructors);
  }

  createQuery(include: any[], exclude: any[]): EntityQuery {
    return this._queryExt.createQuery(include, exclude);
  }
}



