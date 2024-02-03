import { ValueObject, Unique } from '../value-object';

/**
 * Snowflake ID を表すクラス。
 */
export default class SnowflakeId extends ValueObject<string> {
  [Unique]: void;

  protected isValid(value: string): boolean {
    const validator = new RegExp('^[0-9]{18,20}$', 'gm');
    return validator.test(value);
  }
}
