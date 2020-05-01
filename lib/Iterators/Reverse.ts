import IterableWithSource from "../IterableWithSource";

export default class ReverseIterable<T> extends IterableWithSource<T, T> {
  constructor(source: Iterable<T>) {
    super(source);
  }

  [Symbol.iterator](): Iterator<T> {
    return new ReverseIterator(this.source);
  }
}

class ReverseIterator<T> implements Iterator<T> {
  protected rawSource: Iterable<T>;
  protected source?: Iterator<T>;

  constructor(source: Iterable<T>) {
    this.rawSource = source;
  }

  next(): IteratorResult<T, undefined> {
    if (!this.source) this.source = this.reverseInMemory();
    return this.source.next();
  }

  reverseInMemory(): Iterator<T> {
    const reversedArray = [];
    for (const element of this.rawSource) {
      reversedArray.unshift(element);
    }
    return reversedArray[Symbol.iterator]();
  }
}