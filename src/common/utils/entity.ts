import { Comparable } from './utilitiy-interfaces';
import { ValueObject } from './value-object';

export abstract class Entity<
  T extends Record<keyof T, ValueObject<unknown> | Entity<any>>,
> implements Comparable
{
  protected constructor(protected readonly props: T) {}

  public equals(entity: Entity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    return this.isEqual(entity);
  }

  protected isEqual(entity: Entity<T>): boolean {
    for (const key of Object.keys(this.props) as Array<keyof T>) {
      const value = this.props[key] as Comparable;
      const entityValue = entity.props[key] as Comparable;

      if (!value.equals(entityValue)) {
        return false;
      }
    }
    return true;
  }
}

export abstract class AggregateRoot<
  T extends Record<keyof T, ValueObject<unknown> | Entity<any>>,
> extends Entity<T> {}
