import { ValueObject } from './abstracts/value-object';

type Type = number;

/**
 * Postgresql の BigSerial 型の ID を表すクラス。
 */
export default class BigSerialId extends ValueObject<'bigSerialId', Type> {
  protected isValid(): boolean {
    return this.value > 0;
  }
}
