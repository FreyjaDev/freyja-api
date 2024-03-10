import { Entity } from '../mixins/entity.mixin';

type Primitive = string | number | boolean | undefined | null | bigint;
export type PropTypes =
  | Primitive
  | Date
  | ArrayProp
  | EntityProp<Prop<unknown>>;
export type Prop<T> = { [P in keyof T]: PropTypes };
interface ArrayProp extends Array<PropTypes> {}
interface EntityProp<T extends Prop<T>> extends Entity<T> {}
