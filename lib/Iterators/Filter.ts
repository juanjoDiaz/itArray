import IterableWithSource from "../IterableWithSource";

export default class FilterIterable<T> extends IterableWithSource<T, T>  {
  public fn: (v: T, k: number) => boolean;

  constructor(source: Iterable<T>, fn: (v: T, k: number) => boolean) {
    super(source);
    this.fn = fn;
  }

  [Symbol.iterator](): Iterator<T> {
    return new FilterIterator(this.source, this.fn);
  }
}

class FilterIterator<T> implements Iterator<T, undefined> {
  protected source: Iterator<T, T>;
  protected fn: (v: T, k: number) => boolean;
  protected index: number = 0;

  constructor(source: Iterable<T>, fn: (v: T, k: number) => boolean) {
    this.source = source[Symbol.iterator]();
    this.fn = fn;
  }

  next(): IteratorResult<T, undefined> {
    let done: boolean | undefined, value: T;
    do {
      ({ done, value } = this.source.next());
      if (done) return { done: true, value: undefined };
    } while (!this.fn(value, this.index++));
    
    return { done, value }; // TODO test done: false
  }
}