import { ValueObject, Unique } from './value-object';

export default class Timestamp extends ValueObject<Date> {
  [Unique]: void;

  protected isValid(value: Date): boolean {
    return !!value;
  }
}
