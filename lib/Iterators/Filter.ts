import TransformIterableIterator from "../TransformIterableIterator";

export default class FilterIterableIterator<T> extends TransformIterableIterator<T, T>  {
  protected fn: (v: T, k: number) => boolean;
  protected parentIndex: number = 0;

  constructor(source: IterableIterator<T>, fn: (v: T, k: number) => boolean) {
    super(source);
    this.fn = fn;
  }

  next(): IteratorResult<T, undefined>  {
    let done: boolean | undefined, value: T;
    do {
      ({ done, value } = this.source.next());
      if (done) {
        return { done: true, value: undefined };
      }
    } while (!this.fn(value, this.parentIndex++));
    
    return { done, value };
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new FilterIterableIterator(this.source, this.fn);
  }
}