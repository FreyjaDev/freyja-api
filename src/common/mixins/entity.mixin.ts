import { Cacheable } from './cacheable.mixin';

type Primitive = string | number | boolean | symbol | undefined | null | bigint;
type PropTypes = Primitive | Date;
type Prop<T> = Record<keyof T, PropTypes>;

export abstract class Entity<
  T extends Prop<T> | (Prop<T> & Record<keyof T, Entity<Prop<T>>>),
> extends Cacheable<T> {
  protected constructor(protected props: T) {
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
}
