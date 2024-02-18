import { Unique, ValueObject } from '../utils/value-object';

export class DiscordId extends ValueObject<string> {
  [Unique]: symbol;

  protected isValid(value: string): boolean {
    return /^[0-9]{17,19}$/.test(value);
  }
}
