import { isValid } from 'ulidx';

import { Unique, ValueObject } from '../utils/value-object';

export class GameResultId extends ValueObject<string> {
  [Unique]: symbol;

  protected isValid(value: string): boolean {
    return isValid(value);
  }
}
