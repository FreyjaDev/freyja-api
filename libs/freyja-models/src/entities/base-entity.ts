export type OptionalId<T extends { id: any }> = Omit<T, 'id'> &
  Partial<Pick<T, 'id'>>;
