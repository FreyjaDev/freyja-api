import { Unique, ValueObject } from '../value-object';

export default class FNumber extends ValueObject<number> {
  [Unique]: void;

  protected isValid(value: number): boolean {
    return !!value;
  }
}
