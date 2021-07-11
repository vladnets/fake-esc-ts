import { Type } from '../Type';
import { Sign } from '../Sign';
import { Entity } from '../Entity';
import { ExtensionBase } from './ExtensionBase';

export class EntityExtension extends ExtensionBase {
  createEntity(values: any[]) {
    const entity = this._createOrReuseEntity();
    const types = this._getTypesFromValues(values);
    const sign = this.signManager.createFromTypes(types);
    const container = this._findOrCreateContainer(sign, types);

    container.addEntity(entity, types, values);

    return entity.id;
  }

  removeEntity(entityId: number) {
    const entity = this.entities[entityId];
    entity.container.removeEntity(entity);
    this.entitiesPool.push(entity);
  }

  private _createOrReuseEntity() {
    let entity;

    if (this.entitiesPool.length > 0) {
      entity = this.entitiesPool.pop();
    }
    else {
      entity = new Entity(this.entities.length);
      this.entities.push(entity);
    }

    return entity;
  }
}
