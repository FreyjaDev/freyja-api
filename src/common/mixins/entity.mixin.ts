import { Cacheable } from './cacheable.mixin';
import { Prop } from '../interfaces/props.interface';
import { JsonSerializable } from '../utils/json/props-converter';

export abstract class Entity<T extends Prop<T>> extends Cacheable<T> {
  constructor(protected props: T) {
    super();
  }

  protected equals(entity: Entity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    return this.isEquals(entity);
  }

  protected isEquals(entity: Entity<T>): boolean {
    for (const key of Object.keys(this.props) as (keyof T)[]) {
      const value = this.props[key];
      const entityValue = entity.props[key];

      if (value !== entityValue) {
        return false;
      }
    }
    return true;
  }

  // TODO: This class should convert itself to a Dto object, and I'll implement it if I become a genius :-)
  // I cannot implement this method because I don't know how to implement it. I'm so foolish.
  abstract toDto(): JsonSerializable<T>;
}
