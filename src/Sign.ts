import { Type } from './Type';

export class Sign {
  constructor(
    readonly parts: number[]
  ) {}

  includes(otherSign: Sign): boolean {
    return this.parts.every((part, index) => {
      const otherPart = otherSign.parts[index];
      return (part & otherPart) === otherPart;
    });
  }

  excludes(otherSign: Sign): boolean {
    return this.parts.every((part, index) => {
      const otherPart = otherSign.parts[index];
      return (part & otherPart) === 0;
    });
  }

  clone(): Sign {
    return new Sign([...this.parts]);
  }

  addTypes(types: Type[]): void {
    types.forEach(type => {
      type.sign.parts.forEach((mask, index) => {
        const thisMask = this.parts[index];

        const rest = (thisMask & mask);
        this.parts[index] += (mask - rest);
      });
    });
  }
}
