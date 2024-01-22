import { JsonSerializable } from '../../../../src/common/interfaces/core/core';

export abstract class Entity {
  protected constructor() {}

  abstract unwrap(): JsonSerializable;
}
