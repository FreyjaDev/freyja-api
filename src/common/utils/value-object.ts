import { Comparable } from './utilitiy-interfaces';

export declare const Unique: unique symbol;

export abstract class ValueObject<T> implements Comparable {
  constructor(protected readonly _value: T) {
    if (!this.isValid(_value)) {
      throw new TypeError('This value is invalid.');
    }
  }

  public value(): T {
    return this._value;
  }

  public static of<T, Instance extends ValueObject<T>>(
    this: new (value: T) => Instance,
    value: ReturnType<Instance['value']>,
  ) {
    return new this(value);
  }

  public equals(valueObject: ValueObject<T>): boolean {
    return this._value === valueObject._value;
  }

  protected abstract isValid(value: T): boolean;
}
