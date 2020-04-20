import SomeReducer from "./Some";

export default class IncludesReducer<T> extends SomeReducer<T> {
  protected value: T;

  constructor(source: IterableIterator<T>, value: T) {
    super(source, (v: T, _: number) => v === value);
    this.value = value;
  }

  [Symbol.iterator](): IterableIterator<boolean | undefined> {
    return new IncludesReducer(this.source, this.value);
  }
}