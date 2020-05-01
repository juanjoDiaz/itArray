import IterableWithSource from "../IterableWithSource";

function isIterable<T>(obj: any): obj is Iterable<Iterable<T>> {
  return typeof obj[Symbol.iterator] === 'function';
}

export default class FlatIterable<T> extends IterableWithSource<T | Iterable<T>, T> {
  protected depth?: number;

  constructor(source: Iterable<T | Iterable<T>>, depth?: number) {
    super(source);
    this.depth = depth;
  }

  [Symbol.iterator](): Iterator<T> {
    return new FlatIterator(this.source, this.depth);
  }
}

class FlatIterator<T> implements Iterator<T, undefined> {
  protected source: Iterator<T | Iterable<T>, undefined>;
  protected depth?: number;
  protected currentSource?: Iterator<T, T>;

  constructor(source: Iterable<T | Iterable<T>>, depth?: number) {
    let deepSource = source;
    if (depth && depth > 1) {
      this.source = new FlatIterator(deepSource, depth - 1);
    } else {
      this.source = source[Symbol.iterator]();
    }
    this.depth = depth;
  }

  next(): IteratorResult<T, undefined>  {
    if (!this.currentSource) {
      const { done, value } = this.source.next();
      if (done === true) return { done: true, value: undefined };
      this.currentSource = (isIterable(value) ? value : [value])[Symbol.iterator]() as Iterator<T, T>;
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
}