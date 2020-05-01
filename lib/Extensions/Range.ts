export default class RangeIterable implements Iterable<number> {
  private start: number;
  private end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator](): Iterator<number> {
    return new RangeIterator(this.start, this.end);
  }
}

class RangeIterator implements Iterator<number> {
  private end: number;
  private current: number;

  constructor(start: number, end: number) {
    this.current = start;
    this.end = end;
  }

  next(): IteratorResult<number, undefined> {
    if (this.current >= this.end) {
      return { done: true, value: undefined };
    }

    return { done: false, value: this.current += 1 };
  }
}