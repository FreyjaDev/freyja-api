export abstract class ValueObject<T extends string, U> {
  readonly valueObjectType: T | undefined;

  constructor(readonly value: U) {
    if (!this.isValid()) {
      throw new TypeError(
        `Invalid value for ${this.valueObjectType}: ${value}`,
      );
    }
  }

  equals(v: ValueObject<T, U>): boolean {
    return this.value === v.value;
  }

  protected abstract isValid(): boolean;
}
