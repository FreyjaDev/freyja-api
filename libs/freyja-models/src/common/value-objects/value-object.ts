export declare const Unique: unique symbol;

export abstract class ValueObject<T> {
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

  protected abstract isValid(value: T): boolean;
}
