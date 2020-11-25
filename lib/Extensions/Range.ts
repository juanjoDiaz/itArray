export default class RangeIterable implements Iterable<number> {
  private start: number;
  private end: number;
  private step: number;

  constructor(start: number, end: number, step: number = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator](): Iterator<number> {
    return new RangeIterator(this.start, this.end, this.step);
  }
}

class RangeIterator implements Iterator<number> {
  private step: number;
  private end: number;
  private current: number;
  private decreasing: boolean = false;

  constructor(start: number, end: number, step: number = 1) {
    this.step = step;
    this.current = start;
    this.end = end;
    this.decreasing = (start >= end);
  }

  next(): IteratorResult<number, undefined> {
    if (this.current == this.end) {
      return { done: true, value: undefined };
    }

    return {
      done: false,
      value: this.decreasing ? this.current -= this.step : this.current +=  this.step,
    };
  }
}