import { Entity } from '../mixins/entity.mixin';

type Primitive = string | number | boolean | undefined | null | bigint;
export type PropTypes<T> = Primitive | Date | ArrayProp<T> | EntityProp<T>;
export type Prop<T> = { [P in keyof T]: PropTypes<T> };
interface ArrayProp<T> extends Array<PropTypes<T>> {}
interface EntityProp<T> extends Entity<Prop<T>> {}
