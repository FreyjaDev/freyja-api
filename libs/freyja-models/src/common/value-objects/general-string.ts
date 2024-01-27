import { Unique, ValueObject } from './value-object';

export default class GeneralString extends ValueObject<string> {
  [Unique]: void;

  protected isValid(value: string): boolean {
    return value.length < 256;
  }
}
