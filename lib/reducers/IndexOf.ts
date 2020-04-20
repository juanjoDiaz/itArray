import { FindIndexReducer } from "./FindIndex";

export class IndexOfReducer<T> extends FindIndexReducer<T> {
  protected value: T;

  constructor(source: IterableIterator<T>, value: T) {
    super(source, (v: T, _: number) => v === value);
    this.value = value;
  }

  [Symbol.iterator](): IterableIterator<number | undefined> {
    return new IndexOfReducer(this.source, this.value);
  }
}