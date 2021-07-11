import { EntityContainer } from './EntityContainer';

export class Entity {
  constructor(
    public readonly id: number,
    public container: EntityContainer = null,
    public index: number = -1
  ) { }
}
