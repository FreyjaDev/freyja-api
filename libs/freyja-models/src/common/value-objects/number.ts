import { Unique, ValueObject } from '../value-object';

export default class Number extends ValueObject<number> {
  [Unique]: void;

  protected isValid(value: number): boolean {
    return !!value;
  }
}
