import { Cacheable } from './cacheable.mixin';

type Primitive = string | number | boolean | undefined | null | bigint;
type PropTypes = Primitive | Date | Array<PropTypes>;
type Prop<T> = { [P in keyof T]: PropTypes };
type Props<T> = Prop<T> | (Prop<T> & { [P in keyof T]: Entity<Prop<T>> });

type JsonValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | JsonArray
  | JsonObject;
interface JsonObject {
  [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {}

export abstract class Entity<T extends Props<T>> extends Cacheable<T> {
  constructor(protected props: T) {
    super();
  }

  protected equals(entity: Entity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    return this.isEquals(entity);
  }

  protected isEquals(entity: Entity<T>): boolean {
    for (const key of Object.keys(this.props) as (keyof T)[]) {
      const value = this.props[key];
      const entityValue = entity.props[key];

      if (value !== entityValue) {
        return false;
      }
    }
    return true;
  }

  toJSON(): JsonValue {
    return convert(this.props);
  }
}

const convert = <T extends Props<T>>(props: T): JsonValue => {
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
