import { ValueObject } from './abstracts/value-object';

type Type = Date;

export default class Timestamp extends ValueObject<'timestamp', Type> {
  protected isValid(): boolean {
    return true;
  }
}
