// import { JsonArray, JsonObject, JsonValue } from '../../interfaces/json.interface';
// import { Entity } from '../../mixins/entity.mixin';
// import { Prop, PropTypes } from '../../interfaces/props.interface';
//
// export const convert = <T extends Prop<T>>(props: T): JsonValue => {
//   const result: JsonValue = {};
//   for (const key of Object.keys(props) as (keyof T)[]) {
//     const value = props[key];
//     result[key as string] = convertPropType(value);
//   }
//   return result;
// };
//
// export const convertPropType = <T extends PropTypes<T>>(prop: T) => {
//   if (prop instanceof Date) {
//     return prop.toISOString();
//   } else if (Array.isArray(prop)) {
//     return prop.map((p) => convertPropType(p));
//   } else if (prop instanceof Entity) {
//     return prop.toJSON() as JsonObject;
//   } else if(prop === undefined) {
//     return null;
//   } else {
//     return prop;
//   }
// };
