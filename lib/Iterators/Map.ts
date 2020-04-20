import TransformIterableIterator from "../TransformIterableIterator";

export default class MapIterableIterator<TIn, TOut = TIn> extends TransformIterableIterator<TIn, TOut> {
  protected fn: (v: TIn, k: number) => TOut;
  protected index: number = 0;

  constructor(source: IterableIterator<TIn>, fn: (v: TIn, k: number) => TOut) {
    super(source);
    this.fn = fn;
  }

  next(): IteratorResult<TOut, undefined>  {
    const { done, value } = this.source.next();

    if (done) {
      return { done: true, value: undefined };
    }

    return { done, value: this.fn(value, this.index++) };
  }

  [Symbol.iterator](): IterableIterator<TOut> {
    return new MapIterableIterator(this.source, this.fn);
  }
}