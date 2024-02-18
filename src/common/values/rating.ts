import { Unique, ValueObject } from '../utils/value-object';

export class Rating extends ValueObject<number> {
  [Unique]: symbol;

  protected isValid(value: number): boolean {
    return value >= 0 && Number.isInteger(value);
  }
}
