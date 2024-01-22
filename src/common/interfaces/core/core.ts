export type JsonSerializable = Record<
  string,
  string | number | boolean | null | Array<any> | Record<any, any>
>;
