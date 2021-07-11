import { EntityContainer } from './EntityContainer';
import { IConstructor } from "./IConstructor";
import { Type } from './Type';
import { SignManager } from './SignManager';
import { Sign } from './Sign';
import { TypeManager } from './TypeManager';

type IEntityContainerManagerLevel<T> = { [id: number]: T | IEntityContainerManagerLevel<T> }
export class EntityContainerManager {
  readonly typeManager: TypeManager<IConstructor<any>>;
  readonly signManager: SignManager;
  readonly containers: EntityContainer[];
  readonly containersMap: IEntityContainerManagerLevel<EntityContainer>;

  constructor(
    typeManager: TypeManager<IConstructor<any>>
  ) {
    this.typeManager = typeManager;
    this.signManager = this.typeManager.signManager;
    this.containers = [];
    this.containersMap = {};
    this._init();
  }

  create(sign: Sign, types: Type[]) {
    const container: EntityContainer = new EntityContainer(sign, types, this.typeManager);

    this.addContainer(container);
    return container;
  }

  addContainer(container: EntityContainer) {
    let context = this.containersMap;

    const sign = container.sign;
    for(let i = 0; i < sign.parts.length - 1; i++) {
      const id = sign.parts[i];

      if (!context[id]) {
        context[id] = {};
      }

      context = context[id] as any;
    }

    this.containers.push(container);
    context[sign.parts[sign.parts.length - 1]] = container;
  }

  getContainer(sign: Sign): undefined | EntityContainer {
    let context = this.containersMap;

    for(let i = 0; i < sign.parts.length; i++) {
      const id = sign.parts[i];

      if (!context[id]) {
        return;
      }

      context = context[id] as any;
    }

    return (context as any) as EntityContainer;
  }

  private _init() {
    // let context = this.containers;
    // for(let i = 0; i < this.signManager.signPartsCount; i++) {
    //   context[0] = {};
    //   context = context[0];
    // }
  }
}
