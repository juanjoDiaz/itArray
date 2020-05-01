export default abstract class IteratorWithSource<T, TReturn = any> implements Iterator<T, TReturn> {
  protected source: Iterator<T>;

  constructor(source: Iterable<T>) {
    this.source = source[Symbol.iterator]();
  }

  abstract next(): IteratorResult<T, TReturn>;
  
  return(): IteratorResult<T, TReturn> {
    while (true) {
      const res = this.next();
      if (res.done) return res;
    }
  }

  throw?(e?: any): IteratorResult<T, TReturn> {
    throw e;
  }
}