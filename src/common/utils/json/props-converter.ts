// import { Prop, PropTypes } from '../../interfaces/props.interface';
// import { JsonObject, JsonValue } from '../../interfaces/json.interface';
// import { Entity } from '../../mixins/entity.mixin';
//
// export const convert = <T extends Prop<unknown>>(props: T): JsonSerializable<T> => {
//   const result: JsonSerializable<T> = {} as JsonSerializable<T>;
//   for (const key of Object.keys(props) as (keyof T)[]) {
//     const value = props[key] as PropTypes<unknown>;
//     result[key] = convertPropType(value);
//   }
//   return result;
// }
//
// const convertPropType = <T extends PropTypes<unknown>>(prop: T): JsonValue => {
//   if (prop instanceof Date) {
//     return prop.toISOString();
//   } else if (Array.isArray(prop)) {
//     return prop.map((p) => convertPropType(p));
//   } else if (prop instanceof Entity) {
//     return prop.toDto() as JsonObject;
//   } else if (prop === undefined) {
//     return null;
//   } else {
//     return prop;
//   }
// }

import { JsonValue } from '../../interfaces/json.interface';
import { Prop } from '../../interfaces/props.interface';

export type JsonSerializable<T extends Prop<unknown>> = {
  [P in keyof T]-?: T[P] extends JsonValue
    ? T[P]
    : Exclude<T[P], undefined> extends JsonValue
      ? Exclude<T[P], undefined> | null
      : T[P] extends Date
        ? string
        : T[P] extends Prop<unknown>
          ? JsonSerializable<T>
          : never;
};
