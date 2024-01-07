import { ValueObject } from './abstracts/value-object';

type Type = string;

/**
 * Snowflake ID を表すクラス。
 */
export default class SnowflakeId extends ValueObject<'snowflakeId', Type> {
  private validator = new RegExp('^[0-9]{18,20}$', 'gm');

  protected isValid(): boolean {
    return this.validator.test(this.value);
  }
}
