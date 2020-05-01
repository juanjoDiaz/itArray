export default abstract class TransformIterableIterator<TIn, TOut, TReturn = any> implements Iterable<TOut> {
  protected source: IterableIterator<TIn>;

  constructor(source: IterableIterator<TIn>) {
    this.source = source[Symbol.iterator]();
  }

  abstract [Symbol.iterator](): IterableIterator<TOut>;
}