import { JsonSerializable } from '../../../../src/common/interfaces/core/core';

export interface Entity {
  unwrap(): JsonSerializable;
}
