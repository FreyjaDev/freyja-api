abstract class FreyjaBaseException extends Error {
  protected constructor(
    readonly code: string,
    readonly message: string,
  ) {
    super();
  }
}

export class GuildAlreadyInitializedException extends FreyjaBaseException {
  constructor() {
    super('FE0001', 'This guild has already been initialized.');
  }
}
