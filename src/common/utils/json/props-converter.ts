import { JsonValue } from '../../interfaces/json.interface';
import { Entity } from '../../mixins/entity.mixin';
import { Props, PropTypes } from '../../interfaces/props.interface';

export const convert = <T extends Props<T>>(props: T): JsonValue => {
  const result: JsonValue = {};
  for (const key of Object.keys(props) as (keyof T)[]) {
    const value = props[key];
    if (value instanceof Entity) {
      result[key as string] = value.toJSON();
    } else {
      result[key as string] = convertPropType(value);
    }
  }
  return result;
};

const convertPropType = (prop: PropTypes): JsonValue => {
  if (prop instanceof Date) {
    return prop.toISOString();
  } else if (Array.isArray(prop)) {
    return prop.map((p) => convertPropType(p));
  } else if (prop === undefined) {
    return null;
  }
  return prop;
};
