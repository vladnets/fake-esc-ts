import { Type } from '../Type';
import { Sign } from '../Sign';
import { Entity } from '../Entity';
import { ExtensionBase } from './ExtensionBase';
import { EntityQuery } from '../EntityQuery';

export class QueryExtension extends ExtensionBase {
  createQuery(include: any[], exclude: any[]): EntityQuery {
    const includeTypes = this._getTypesFromConstructors(include);
    const excludeTypes = this._getTypesFromConstructors(exclude);

    const includeSign = this.signManager.createFromTypes(includeTypes);
    const excludeSign = this.signManager.createFromTypes(excludeTypes);
    const query = new EntityQuery(includeSign, excludeSign);

    this.queries.push(query);
    this.containerManager.containers.forEach(container => query.tryAddContainer(container));

    return query;
  }
}
