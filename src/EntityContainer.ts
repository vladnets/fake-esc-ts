import { Entity } from './Entity';
import { IConstructor } from './IConstructor';
import { Sign } from './Sign';
import { Type } from './Type';
import { TypeManager } from './TypeManager';

export class EntityContainer {
  sign: Sign;
  types: Type[];

  typeManager: TypeManager<IConstructor<any>>;

  count: number;
  entities: Entity[];
  components: any[][];
  [component: number]: any[];

  constructor(sign: Sign, types: Type[], typeManager: TypeManager<IConstructor<any>>) {
    this.sign = sign;
    this.types = types;

    this.typeManager = typeManager;

    this.count = 0;
    this.entities = [];
    this.components = [];

    this.types.forEach(type => {
      if (this[type.id]) return;

      const component: any[] = [];
      this.components.push(component);
      this[type.id] = component;
    });
  }

  addEntity(entity: Entity, types: Type[], values: any[]) {
    const index = this.count;

    // reuse entity slot
    if (index < this.entities.length) {
      this.entities[index] = entity;
      types.forEach((type, valueIndex) => {
        if (!this[type.id]) return;

        this[type.id][index] = values[valueIndex];
      });
    }
    // push new entity slot
    else {
      this.entities.push(entity);
      types.forEach((type, valueIndex) => {
        if (!this[type.id]) return;

        this[type.id].push(values[valueIndex]);
      });
    }

    entity.index = index;
    entity.container = this;

    this.count++;
    return index;
  }

  // returns removed values
  removeEntity(entity: Entity): any[] {
    const lastIndex = this.count - 1;

    let removedValues: any[];
    if (entity.index === lastIndex) {
      removedValues = this._removeLast();
    } else {
      removedValues = this._swapWithLast(entity.index);
    }

    entity.index = -1;
    entity.container = null;

    this.count--;
    return removedValues;
  }

  getComponent<T>(Constructor: IConstructor<T>): T[] {
    const type = this.typeManager.getType(Constructor);
    return this[type.id];
  }

  private _removeLast() {
    const lastIndex = this.count - 1;

    this.entities[lastIndex] = null;

    const removedValues: any[] = [];
    const length = this.types.length;
    for(let i = 0; i < length; i++) {
      const component = this.components[i];
      removedValues.push(component[lastIndex]);
      component[lastIndex] = null;
    }

    return removedValues;
  }

  private _swapWithLast(index: number) {
    const lastIndex = this.count - 1;
    const lastEntity = this.entities[lastIndex];

    this.entities[index] = lastEntity;
    this.entities[lastIndex] = null;

    const removedValues: any[] = [];
    const length = this.types.length;
    for(let i = 0; i < length; i++) {
      const component = this.components[i];
      removedValues.push(component[index]);
      component[index] = component[lastIndex];
      component[lastIndex] = null;
    }

    lastEntity.index = index;

    return removedValues;
  }
}
