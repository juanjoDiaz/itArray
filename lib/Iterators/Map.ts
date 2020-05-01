import IterableWithSource from "../IterableWithSource";

export default class MapIterable<TIn, TOut = TIn> extends IterableWithSource<TIn, TOut> {
  public fn: (v: TIn, k: number) => TOut;
  protected index: number = 0;

  constructor(source: Iterable<TIn>, fn: (v: TIn, k: number) => TOut) {
    super(source);
    this.fn = fn;
  }

  [Symbol.iterator](): Iterator<TOut> {
    return new MapIterator(this.source, this.fn);
  }
}

class MapIterator<TIn, TOut = TIn> implements Iterator<TOut, undefined> {
  protected source: Iterator<any, TIn>;
  protected fn: (v: TIn, k: number) => TOut;
  protected index: number = 0;

  constructor(source: Iterable<TIn>, fn: (v: TIn, k: number) => TOut) {
    this.source = source[Symbol.iterator]();
    this.fn = fn;
  }

  next(): IteratorResult<TOut, undefined>  {
    const { done, value } = this.source.next();

    if (done) {
      return { done: true, value: undefined };
    }

    return { done, value: this.fn(value, this.index++) };
  }
}