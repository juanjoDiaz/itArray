import TransformIterableIterator from "../TransformIterableIterator";
import ArrayTransIterableIterator from "../ArrayTransIterableIterator";

function isIterable<T>(obj: any): obj is Iterable<Iterable<T>> {
  return typeof obj[Symbol.iterator] === 'function';
}

export default class FlatIterableIterator<T> extends TransformIterableIterator<T | Iterable<T>, T> {
  protected rawSource: IterableIterator<T | Iterable<T>>;
  protected depth?: number;
  protected currentSource: Iterator<T> | undefined;

  constructor(source: IterableIterator<T | Iterable<T>>, depth?: number) {
    let deepSource = source;
    if (depth && depth > 1) {
      deepSource = new FlatIterableIterator(deepSource, depth - 1);
    }
    super(deepSource);
    this.rawSource = source;
    this.depth = depth;
  }

  next(): IteratorResult<T, undefined>  {
    if (!this.currentSource) {
      const { done, value } = this.source.next();
      if (done === true) return { done: true, value: undefined };
      if (value instanceof TransformIterableIterator) {
        this.currentSource = value;
      } else {
        // TODO find better way to cast
        this.currentSource = new ArrayTransIterableIterator(isIterable(value) ? value : [value] as any);
      }
    }

    const { done, value } = this.currentSource.next();
    if (done) {
      this.currentSource = undefined;
      return this.next();
    }

    return {
      done: false,
      value
    }
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new FlatIterableIterator(this.rawSource, this.depth);
  }
}