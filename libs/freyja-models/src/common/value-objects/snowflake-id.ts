import { ValueObject } from './abstracts/value-object';

type Type = string;

/**
 * Snowflake ID を表すクラス。
 */
export default class SnowflakeId extends ValueObject<'snowflakeId', Type> {
  protected isValid(): boolean {
    const validator = new RegExp('^[0-9]{18,20}$', 'gm');
    return validator.test(this.value);
  }
}
