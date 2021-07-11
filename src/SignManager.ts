import { Type } from './Type';
import { Sign } from './Sign';

export class SignManager {

  constructor(
    public readonly signPartsCount: number
  ) { }

  createEmpty() {
    const parts: number[] = [];

    const count = this.signPartsCount;
    for (let i = 0; i < count; i++) {
      parts.push(0);
    }

    return new Sign(parts);
  }

  createFromTypes(types: Type[]): Sign {
    const sign = this.createEmpty();
    sign.addTypes(types);

    return sign;
  }
}
