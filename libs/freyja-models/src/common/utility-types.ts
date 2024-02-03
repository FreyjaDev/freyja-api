export type OptionalId<T extends { id: any }> = Omit<T, 'id'> &
  Partial<Pick<T, 'id'>>;

export type JsonSerializable = Record<
  string,
  string | number | boolean | null | Array<any> | Record<any, any>
>;
