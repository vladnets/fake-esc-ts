import { Type } from '../Type';
import { Sign } from '../Sign';
import { Entity } from '../Entity';
import { ExtensionBase } from './ExtensionBase';

export class ComponentsExtension extends ExtensionBase {
  setComponents(entityId: number, values: any[]) {
    const entity = this.entities[entityId];

    const oldContainer = entity.container;

    const addingTypes = this._getTypesFromValues(values);
    const oldTypes = oldContainer.types;

    const allTypes = [...addingTypes, ...oldTypes];
    const sign = this.signManager.createFromTypes(allTypes);

    const newContainer = this._findOrCreateContainer(sign, allTypes);

    const removedValues = oldContainer.removeEntity(entity);
    const allValues = [...values, ...removedValues];

    newContainer.addEntity(entity, allTypes, allValues);
  }

  removeComponents(entityId: number, Constructors: any[]) {
    const entity = this.entities[entityId];

    const oldContainer = entity.container;

    const removingTypes = this._getTypesFromConstructors(Constructors);
    const oldTypes = oldContainer.types;
    const newTypes = oldTypes.filter(type => !removingTypes.includes(type));

    const sign = this.signManager.createFromTypes(newTypes);

    const newContainer = this._findOrCreateContainer(sign, newTypes);

    const removedValues = oldContainer.removeEntity(entity);

    if (!newContainer.addEntity) {
      console.log(sign, newTypes, this);
    }
    newContainer.addEntity(entity, oldTypes, removedValues);
  }
}
