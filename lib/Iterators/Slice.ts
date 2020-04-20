import ValuesIterableIterator from "./Values";

export default class SliceIterableIterator<T> extends ValuesIterableIterator<T> {
  private begin?: number;
  private end?: number;
  protected index: number = 0;

  constructor(source: IterableIterator<T>, begin?: number, end?: number) {
    super(source);
    this.begin = begin;
    this.end = end;
  }

  next(): IteratorResult<T, undefined> {
    if (this.begin) {
      while (this.index < this.begin) {
        if (this.source.next().done) return { done: true, value: undefined };
        this.index += 1;
      }
    }

    if (this.end && this.index >= this.end) {
      return { done: true, value: undefined };
    }

    const { done, value } = this.source.next();
    if (done) return { done, value: undefined };

    this.index++;
    return { done, value };
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new SliceIterableIterator(this.source, this.begin, this.end);
  }
}