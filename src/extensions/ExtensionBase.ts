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

export abstract class ExtensionBase {
  entities: Entity[];
  entitiesPool: Entity[];
  queries: EntityQuery[];
  typeManager: TypeManager<any>;
  signManager: SignManager;
  containerManager: EntityContainerManager;

  constructor(
    context: IExtensionContext
  ) {
    this.entities = context.entities;
    this.entitiesPool = context.entitiesPool;
    this.queries = context.queries;
    this.typeManager = context.typeManager;
    this.signManager = context.signManager;
    this.containerManager = context.containerManager;
  }

  protected _findOrCreateContainer(sign: Sign, types: Type[]) {
    const existedContainer = this.containerManager.getContainer(sign);

    if (existedContainer) {
      return existedContainer;
    }

    return this._createContainer(sign, types);
  }

  protected _createContainer(sign: Sign, types: Type[]) {
    const container = this.containerManager.create(sign, types);
    this.queries.forEach(query => query.tryAddContainer(container));

    return container;
  }

  protected _getTypesFromValues(values: any[]) {
    return values.map(value => this.typeManager.getType(value.constructor));
  }

  protected _getTypesFromConstructors(Constructors: any[]) {
    return Constructors.map(Constructor => this.typeManager.getType(Constructor));
  }
}
