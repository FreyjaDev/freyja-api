import { JsonSerializable } from '../common/utility-types';

export interface Entity {
  unwrap(): JsonSerializable;
}
