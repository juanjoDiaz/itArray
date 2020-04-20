import TransformIterableIterator from "../TransformIterableIterator";

export default class ValuesIterableIterator<T> extends TransformIterableIterator<T, T> {
  constructor(source: IterableIterator<T>) {
    super(source);
  }

  next(): IteratorResult<T, undefined>  {
    return this.source.next();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new ValuesIterableIterator(this.source);
  }
}