import { Unique, ValueObject } from '../utils/value-object';

export class RatingTypeName extends ValueObject<string> {
  [Unique]: symbol;

  protected isValid(value: string): boolean {
    return value.length <= 255;
  }
}
