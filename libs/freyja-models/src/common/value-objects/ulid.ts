import { isValid, ulid } from 'ulidx';

import { ValueObject } from './abstracts/value-object';

export default class ULID extends ValueObject<'ulid', string> {
  constructor(value: string | undefined) {
    super(value ?? ulid());
  }

  protected isValid(): boolean {
    return isValid(this.value);
  }
}
