import { Entity } from '../mixins/entity.mixin';

type Primitive = string | number | boolean | undefined | null | bigint;
export type PropTypes = Primitive | Date | Array<PropTypes>;
type Prop<T> = { [P in keyof T]: PropTypes };
export type Props<T> =
  | Prop<T>
  | (Prop<T> & { [P in keyof T]: Entity<Prop<T>> });
