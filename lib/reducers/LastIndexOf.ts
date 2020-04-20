import { FindIndexReducer } from "./FindIndex";

export class LastIndexOfReducer<T> extends FindIndexReducer<T> {
  protected value: T;

  constructor(source: IterableIterator<T>, value: T) {
    super(source, (v: T, _: number) => v === value);
    this.value = value;
  }

  next(): IteratorResult<number, number> {
    if (this.found) return { done: true, value: this.index };

    const { done } = super.next();
    if (done) return { done, value: this.found ? this.index : -1 };

    return {
      done: false,
      value: this.found ? this.index : -1
    };
  }

  [Symbol.iterator](): IterableIterator<number | undefined> {
    return new LastIndexOfReducer(this.source, this.value);
  }
}