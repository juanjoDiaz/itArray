export default abstract class IterableWithSource<TIn, TOut> implements Iterable<TOut> {
  public source: Iterable<TIn>;

  constructor(source: Iterable<TIn>) {
    this.source = source;
  }

  abstract [Symbol.iterator](): Iterator<TOut>;
}