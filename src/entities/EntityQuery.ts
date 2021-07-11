import { EntityContainer } from './EntityContainer';
import { Sign } from './Sign';

export class EntityQuery {
  readonly includeSign: Sign;
  readonly excludeSign: Sign;
  readonly containers: EntityContainer[];

  constructor(includeSign: Sign, excludeSign: Sign) {
    this.includeSign = includeSign;
    this.excludeSign = excludeSign;
    this.containers = [];
  }

  // `true` if container matches group requirements, `false` otherwise
  tryAddContainer(container: EntityContainer): boolean {
    if (!container.sign.includes(this.includeSign) || !container.sign.excludes(this.excludeSign)) {
      return false;
    }

    this.containers.push(container);
    return true;
  }
}
