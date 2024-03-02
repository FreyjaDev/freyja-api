import { Cacheable } from './cacheable.mixin';
import { JsonValue } from '../interfaces/json.interface';
import { Props } from '../interfaces/props.interface';
import { convert } from '../utils/json/props-converter';

export abstract class Entity<T extends Props<T>> extends Cacheable<T> {
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

  toJSON(): JsonValue {
    return convert(this.props);
  }
}
