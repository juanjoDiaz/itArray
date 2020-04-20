export default abstract class TransformIterableIterator<TIn, TOut, TReturn = any> implements IterableIterator<TOut> {
  protected source: IterableIterator<TIn>;

  constructor(source: IterableIterator<TIn>) {
    this.source = source[Symbol.iterator]();
  }

  abstract next(): IteratorResult<TOut, TReturn>;

  return(): IteratorResult<TOut, TReturn> {
    while (true) {
      const res = this.next();
      if (res.done) return res
    }
  }

  throw(err: any): IteratorResult<TOut, TReturn> {
    throw err;
  }

  abstract [Symbol.iterator](): IterableIterator<TOut>;
}