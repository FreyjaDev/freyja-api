export abstract class Entity {
  protected constructor() {}

  abstract unwrap(): Record<string, string | number | boolean>;
}
