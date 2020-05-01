import IterableWithSource from "../IterableWithSource";

export default class SliceIterable<T> extends IterableWithSource<T, T> {
  private begin?: number;
  private end?: number;
  protected index: number = 0;

  constructor(source: Iterable<T>, begin?: number, end?: number) {
    super(source);
    this.begin = begin;
    this.end = end;
  }

  [Symbol.iterator](): Iterator<T> {
    return new SliceIterator(this.source, this.begin, this.end);
  }
}

class SliceIterator<T> implements Iterator<T> {
  protected source: Iterator<any, T>;
  private begin?: number;
  private end?: number;
  protected index: number = 0;

  constructor(source: Iterable<T>, begin?: number, end?: number) {
    this.source = source[Symbol.iterator]();
    this.begin = begin;
    this.end = end;
  }

  next(): IteratorResult<T, undefined> {
    if (this.begin !== undefined) {
      while (this.index < this.begin) {
        if (this.source.next().done) return { done: true, value: undefined };
        this.index += 1;
      }
    }

    if (this.end !== undefined && this.index >= this.end) {
      return { done: true, value: undefined };
    }

    const { done, value } = this.source.next();
    if (done) return { done, value: undefined };

    this.index++;
    return { done, value };
  }
}