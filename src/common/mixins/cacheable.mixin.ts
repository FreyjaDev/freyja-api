export abstract class Cacheable<T, KT = string> {
  private cache: Map<KT, T> = new Map<KT, T>();

  private get(key: KT): T | undefined {
    return this.cache.get(key);
  }
  private set(key: KT, value: T): void {
    this.cache.set(key, value);
  }
}
