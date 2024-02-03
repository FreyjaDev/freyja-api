import { ValueObject, Unique } from '../value-object';

export default class ULID extends ValueObject<string> {
  [Unique]: void;

  protected override isValid(value: string): boolean {
    return value.length === 26;
  }
}
