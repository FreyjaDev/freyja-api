export type JsonValue =
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
