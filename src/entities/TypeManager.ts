import { SignManager } from './SignManager';
import { Type } from './Type';


export class TypeManager<T extends object> {
  readonly registry: WeakMap<T, Type>;
  readonly signManager: SignManager;

  nextId: number;
  nextPart: number;
  nextPartIndex: number;
  halfMaxPart: number;

  constructor(signManager: SignManager) {
    this.registry = new WeakMap();
    this.signManager = signManager;

    this.nextId = 0;
    this.nextPart = 2;
    this.nextPartIndex = 0;
    this.halfMaxPart = Math.pow(2, 30) / 2;
  }

  getType(constructor: T) {
    return this.registry.get(constructor);
  }

  register(constructor: T) {
    const existed = this.registry.get(constructor);
    if (existed) {
      return existed;
    }

    const signature = this.signManager.createEmpty();
    signature.parts[this.nextPartIndex] = this.nextPart;

    const type = new Type(this.nextId, signature);
    this.registry.set(constructor, type);

    if (this.nextPart > this.halfMaxPart) {
      this.nextPart = 2;
      this.nextPartIndex++;
    } else {
      this.nextPart *= 2;
    }

    this.nextId++;

    return type;
  }
}
